import {
  DynamoDBDocumentClient,
  QueryCommand,
  QueryCommandInput,
  QueryCommandOutput,
} from "@aws-sdk/lib-dynamodb"

/**
 * Async iterator for query items.
 * Executes query and yields array of returned items. Repeats until all items are returned.
 *
 * @example
 * ```typescript
 * for await (const items of queryIterator(exclusiveStartKey => doDynamoDBQuery(exclusiveStartKey))) {
 *   console.log(items)
 * }
 * ```
 */

export async function* queryIterator(
  query: (exclusiveStartKey?: object) => Promise<QueryCommandOutput>,
  options: {
    startKey?: object
  } = {}
) {
  let { startKey: exclusiveStartKey } = options
  do {
    const result = await query(exclusiveStartKey)
    if (result.Items) {
      yield result.Items
    }
    exclusiveStartKey = result.LastEvaluatedKey
  } while (exclusiveStartKey)
}

/**
 * Async iterator for single query items.
 * Executes query and yields each returned item. Repeats until all items are returned.
 *
 * @example
 * ```typescript
 * for await (const item of queryItemIterator(exclusiveStartKey => doDynamoDBQuery(exclusiveStartKey))) {
 *   console.log(item)
 * }
 * ```
 */

export async function* queryItemIterator(
  query: (exclusiveStartKey?: object) => Promise<QueryCommandOutput>,
  options: {
    startKey?: object
  } = {}
) {
  for await (const result of queryIterator(query, options)) {
    for (const item of result) {
      yield item
    }
  }
}

/**
 * Concatenate all query results into an array of items
 *
 * @example
 * ```typescript
 * const input = { TableName: "tableName", ... }
 * const output = await concatQueryResults(client, input)
 * ```
 */

export async function concatQueryResults<T>(
  client: DynamoDBDocumentClient,
  input: QueryCommandInput,
  options: {
    startKey?: object
  } = {}
): Promise<T[]> {
  const result = []

  const asyncIterator = queryItemIterator((exclusiveStartKey) => {
    const command = new QueryCommand({
      ...input,
      ExclusiveStartKey: exclusiveStartKey,
    })
    return client.send(command)
  }, options)

  for await (const item of asyncIterator) result.push(item as T)

  return result
}
