import {
  BatchGetCommand,
  BatchGetCommandInput,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb"

/**
 * Generator to split an array into smaller arrays containing max batchSize items
 */

export function* splitToBatches<T>(arr: T[], batchSize = 25) {
  let start = 0
  while (start < arr.length) {
    const end = start + batchSize
    yield arr.slice(start, end)
    start = end
  }
}

/**
 * Async generator to perform GetBatchCommand and handle unprocessed keys with retries
 */

export async function* retryBatchGetCommand(
  client: DynamoDBDocumentClient,
  requestItems: BatchGetCommandInput["RequestItems"]
) {
  let current = requestItems

  while (current && Object.keys(current).length > 0) {
    const command = new BatchGetCommand({
      RequestItems: current,
    })
    const output = await client.send(command)
    current = output.UnprocessedKeys

    yield output
  }
}
