/* eslint-disable import/no-unresolved */
import type { Context, DynamoDBRecord, DynamoDBStreamEvent } from "aws-lambda"
import { unmarshall } from "@aws-sdk/util-dynamodb"
import { ILogger } from "../common/logger-interface"
import { logger as defaultLogger } from "../common/logger"
import { DynamoDBPersistenceLayer } from "@aws-lambda-powertools/idempotency/dynamodb"
import { BasePersistenceLayer } from "@aws-lambda-powertools/idempotency/persistence"
import {
  IdempotencyConfig,
  makeIdempotent,
} from "@aws-lambda-powertools/idempotency"
import {
  DynamoDBPersistenceOptions,
  IdempotencyConfigOptions,
} from "@aws-lambda-powertools/idempotency/types"
import { type AttributeValue as DynamoAttributeValue } from "@aws-sdk/client-dynamodb"
import assert from "assert"

/**
 * Create standard Lambda handler for DynamoDB Stream events
 *
 * @examples
 * ```ts
 * const handler = createDynamoDbStreamHandler<TableRecord>(
 *   onInsert: (record) => handleInsert(record),
 *   // ...
 * })
 * ```
 */
export function createDynamoDbStreamHandler<T>(
  options: DynamoDbStreamHandlerOptions<T>
) {
  const {
    logger = defaultLogger,
    idempotencyPersistanceStore,
    idempotencyConfig = {},
    logEvents = true,
  } = options

  /*
   * Enable idempotency if persistance store is defined
   */

  const enableIdempotency = idempotencyPersistanceStore !== undefined

  /*
   * Configuration for powertools idempotency helper
   */

  const config = new IdempotencyConfig({
    eventKeyJmesPath: "eventID", // JMES path to idempotency key, see https://jmespath.org/
    throwOnNoIdempotencyKey: true,
    ...idempotencyConfig,
  })

  /**
   * Wrap handler with idempotency layer
   */

  const idempotencyWrapper = (
    handler: (record: DynamoDBRecord) => Promise<string>
  ) => {
    if (enableIdempotency) {
      return makeIdempotent(handler, {
        persistenceStore: idempotencyPersistanceStore,
        config,
      })
    }
    return handler
  }

  /**
   * Handlers for insert / modify / remove events
   */

  const handleInsert = idempotencyWrapper(async (record: DynamoDBRecord) => {
    assert(options.onInsert)
    assertImage(record.dynamodb?.NewImage)
    await options.onInsert(unmarshall(record.dynamodb?.NewImage) as T)
    return `INSERT eventID=${record.eventID}` // Idempotency handler expect handler to return some value which is then stored in persistance store
  })

  const handleModify = idempotencyWrapper(async (record: DynamoDBRecord) => {
    assert(options.onModify)
    assertImage(record.dynamodb?.OldImage)
    assertImage(record.dynamodb?.NewImage)
    await options.onModify(
      unmarshall(record.dynamodb?.OldImage) as T,
      unmarshall(record.dynamodb?.NewImage) as T
    )
    return `MODIFY eventID=${record.eventID}` // Idempotency handler expect handler to return some value which is then stored in persistance store
  })

  const handleRemove = idempotencyWrapper(async (record: DynamoDBRecord) => {
    assert(options.onRemove)
    assertImage(record.dynamodb?.OldImage)
    await options.onRemove(unmarshall(record.dynamodb?.OldImage) as T)
    return `REMOVE eventID=${record.eventID}` // Idempotency handler expect handler to return some value which is then stored in persistance store
  })

  /*
   * Dispatch event to appropriate handler
   */

  const dispatchEventToHandler = async (record: DynamoDBRecord) => {
    try {
      switch (record.eventName) {
        case "INSERT":
          if (options.onInsert) await handleInsert(record)
          break
        case "MODIFY":
          if (options.onModify) await handleModify(record)
          break
        case "REMOVE":
          if (options.onRemove) await handleRemove(record)
          break
        default:
          throw new Error(`Event ${record.eventName} not expected`)
      }
    } catch (error) {
      if (options.onError) {
        // onError can be either synchronous or asynchronous
        await options.onError(record, error)

        // Ignore error if consumeHandledExceptions is true
        if (options.consumeHandledExceptions) {
          return "ERROR" // Idempotency handler from powertools expect that handler returns some result
        }
      }
      throw error
    }
  }

  /*
   * Lambda function handler managing DynamoDB stream events
   */

  const lambdaHandler = async (
    event: DynamoDBStreamEvent,
    context: Context
  ) => {
    if (logEvents)
      logger.info("Incoming event", { batchSize: event?.Records.length, event })

    /*
     * Idempotency handler is using context to get Lambda timeout
     */
    config.registerLambdaContext(context)

    if (options.concurrentBatchProcessing) {
      /*
       * Process batch concurrently, try to process all items before reporting an error
       */

      const settled = await Promise.allSettled(
        event.Records.map((record) => dispatchEventToHandler(record))
      )

      if (settled.some((result) => result.status === "rejected")) {
        throw new Error("Some batch items failed")
      }
    } else {
      /*
       * Process batch sequentially, breaks on first error
       */

      for (const record of event.Records) {
        await dispatchEventToHandler(record)
      }
    }
  }

  return lambdaHandler
}

export type DynamoDbStreamHandlerOptions<T> = {
  /** Handle insertion of an item into DynamoDB table */
  onInsert?: (item: T) => Promise<void>
  /** Handle update of an item into DynamoDB table */
  onModify?: (oldItem: T, newItem: T) => Promise<void>
  /** Handle removal of an item into DynamoDB table */
  onRemove?: (item: T) => Promise<void>
  /**
   * Handle errors in onInsert, onModify and onRemove handlers.
   * If not used then error is thrown
   * Note: when used onError handler the idempotency management will prevent retry on the same record!
   */
  onError?: (
    record: DynamoDBRecord,
    error: unknown
  ) => Promise<void | unknown> | void | unknown
  /**
   * Logger instance
   */
  logger?: ILogger
  /**
   * Optional store for idempotency handling using @aws-lambda-powertools/idempotency
   * If not specified then idempotency is not managed.
   */
  idempotencyPersistanceStore?: BasePersistenceLayer
  /**
   * Optional configuration for idempotency
   */
  idempotencyConfig?: IdempotencyConfigOptions
  /**
   * Process batch items concurrently. Default is false, i.e. sequentially
   * Should not be used if the processing order if items is important.
   */
  concurrentBatchProcessing?: boolean
  /**
   * If exception is handled by onError then the exception is
   */
  consumeHandledExceptions?: boolean
  /**
   * Enable logging of incoming events, default is true
   */
  logEvents?: boolean
}

/**
 * Helper to create DynamoDB persistance store to keep idempotency records.
 *
 * @example
 *
 * ```ts
 * createDefaultIdempotencyPersistanceStore({
 *   tableName: "MyIdempotencyTable", // Default is process.env.IDEMPOTENCY_TABLE
 *   awsSdkV3Client: myDynamoDBClient, // Default is a new instance of DynamoDb client
 * })
 * ```
 */

export function createDefaultIdempotencyPersistanceStore(
  config: Partial<DynamoDBPersistenceOptions> = {}
) {
  const { tableName = process.env.IDEMPOTENCY_TABLE } = config
  if (!tableName)
    throw new Error(
      "createDefaultIdempotencyPersistanceStore: invalid table name, use options or env IDEMPOTENCY_TABLE"
    )

  return new DynamoDBPersistenceLayer({
    tableName,
    ...config,
  })
}

/**
 * Check DynamoDB Stream record and cast it to proper type for unmarshall function
 */

function assertImage(
  value: unknown
): asserts value is Record<string, DynamoAttributeValue> {
  if (value === null || typeof value !== "object") {
    throw new Error("Invalid image in DynamoDB Stream record ")
  }
}
