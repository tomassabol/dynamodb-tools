import {
  DynamoDBDocumentClient,
  QueryCommand,
  QueryCommandInput,
  ScanCommand,
  ScanCommandInput,
} from "@aws-sdk/lib-dynamodb"

export type QueryTableIteratorOptions = Omit<
  QueryCommandInput,
  "TableName" | "ExclusiveStartKey"
>

export type ScanTableIteratorOptions = Omit<
  ScanCommandInput,
  "TableName" | "ExclusiveStartKey"
>

/**
 * Create asynchronous iterator to query all items of a table
 */

export async function* queryTableIterator<T = unknown>(
  client: DynamoDBDocumentClient,
  tableName: string,
  startKey?: object,
  options: QueryTableIteratorOptions = {}
) {
  let lastKey = startKey
  do {
    const command: QueryCommand = new QueryCommand({
      ...options,
      TableName: tableName,
      ExclusiveStartKey: lastKey,
    })

    const output = await client.send(command)

    const items = output.Items
    if (items) {
      for (const item of items) {
        yield item as T
      }
    }

    lastKey = output.LastEvaluatedKey
  } while (lastKey)
}

/**
 * Create asynchronous iterator to scan all items of a table
 */

export async function* scanTableIterator<T = unknown>(
  client: DynamoDBDocumentClient,
  tableName: string,
  startKey?: object,
  options: ScanTableIteratorOptions = {}
) {
  let lastKey = startKey
  do {
    const command: ScanCommand = new ScanCommand({
      ...options,
      TableName: tableName,
      ExclusiveStartKey: lastKey,
    })

    const output = await client.send(command)

    const items = output.Items
    if (items) {
      for (const item of items) {
        yield item as T
      }
    }

    lastKey = output.LastEvaluatedKey
  } while (lastKey)
}

export async function collectItems<T>(iterator: AsyncGenerator<T>) {
  const result = []
  for await (const item of iterator) {
    result.push(item)
  }
  return result
}
