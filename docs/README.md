@tomassabol/dynamodb-tools

# @tomassabol/dynamodb-tools

## Table of contents

### Classes

- [QueryCommandBuilder](classes/QueryCommandBuilder.md)
- [UpdateCommandBuilder](classes/UpdateCommandBuilder.md)

### Interfaces

- [ILogger](interfaces/ILogger.md)

### Type Aliases

- [ConditionOperator](README.md#conditionoperator)
- [DefaultTableFields](README.md#defaulttablefields)
- [DynamoDbStreamHandlerOptions](README.md#dynamodbstreamhandleroptions)
- [QueryTableIteratorOptions](README.md#querytableiteratoroptions)
- [ScanTableIteratorOptions](README.md#scantableiteratoroptions)
- [TTLValue](README.md#ttlvalue)
- [UpdateCommandOptions](README.md#updatecommandoptions)

### Functions

- [collectItems](README.md#collectitems)
- [concatQueryResults](README.md#concatqueryresults)
- [createCompoundKey](README.md#createcompoundkey)
- [createDefaultIdempotencyPersistanceStore](README.md#createdefaultidempotencypersistancestore)
- [createDefaultTableFields](README.md#createdefaulttablefields)
- [createDynamoDbStreamHandler](README.md#createdynamodbstreamhandler)
- [createTTL](README.md#createttl)
- [getCurrentDateTimeISO](README.md#getcurrentdatetimeiso)
- [parseCompoundKey](README.md#parsecompoundkey)
- [queryItemIterator](README.md#queryitemiterator)
- [queryIterator](README.md#queryiterator)
- [queryTableIterator](README.md#querytableiterator)
- [retryBatchGetCommand](README.md#retrybatchgetcommand)
- [scanTableIterator](README.md#scantableiterator)
- [splitToBatches](README.md#splittobatches)

## Type Aliases

### ConditionOperator

Ƭ **ConditionOperator**: `"="` \| `"<"` \| `"<="` \| `">"` \| `">="` \| `"<>"` \| `"IN"`

#### Defined in

```typescript
export type ConditionOperator = "=" | "<" | "<=" | ">" | ">=" | "<>" | "IN"
```

---

### DefaultTableFields

Ƭ **DefaultTableFields**: `Object`

Default fields added to tables

#### Type declaration

| Name        | Type               | Description                                |
| :---------- | :----------------- | :----------------------------------------- |
| `createdAt` | `string`           | Date and time when record was created      |
| `ttl?`      | `number` \| `null` | Time to live                               |
| `updatedAt` | `string`           | Date and time when record was last updated |

#### Defined in

```typescript
export type DefaultTableFields = {
  /** Date and time when record was created */
  createdAt: string
  /** Date and time when record was last updated */
  updatedAt: string
  /** Time to live */
  ttl?: number | null
}
```

---

### DynamoDbStreamHandlerOptions

Ƭ **DynamoDbStreamHandlerOptions**<`T`\>: `Object`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Type declaration

| Name                           | Type                                                                                                       | Description                                                                                                                                                                                   |
| :----------------------------- | :--------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `concurrentBatchProcessing?`   | `boolean`                                                                                                  | Process batch items concurrently. Default is false, i.e. sequentially Should not be used if the processing order if items is important.                                                       |
| `consumeHandledExceptions?`    | `boolean`                                                                                                  | If exception is handled by onError then the exception is                                                                                                                                      |
| `idempotencyConfig?`           | `IdempotencyConfigOptions`                                                                                 | Optional configuration for idempotency                                                                                                                                                        |
| `idempotencyPersistanceStore?` | `BasePersistenceLayer`                                                                                     | Optional store for idempotency handling using @aws-lambda-powertools/idempotency If not specified then idempotency is not managed.                                                            |
| `logEvents?`                   | `boolean`                                                                                                  | Enable logging of incoming events, default is true                                                                                                                                            |
| `logger?`                      | [`ILogger`](interfaces/ILogger.md)                                                                         | Logger instance                                                                                                                                                                               |
| `onError?`                     | (`record`: `DynamoDBRecord`, `error`: `unknown`) => `Promise`<`void` \| `unknown`\> \| `void` \| `unknown` | Handle errors in onInsert, onModify and onRemove handlers. If not used then error is thrown Note: when used onError handler the idempotency management will prevent retry on the same record! |
| `onInsert?`                    | (`item`: `T`) => `Promise`<`void`\>                                                                        | Handle insertion of an item into DynamoDB table                                                                                                                                               |
| `onModify?`                    | (`oldItem`: `T`, `newItem`: `T`) => `Promise`<`void`\>                                                     | Handle update of an item into DynamoDB table                                                                                                                                                  |
| `onRemove?`                    | (`item`: `T`) => `Promise`<`void`\>                                                                        | Handle removal of an item into DynamoDB table                                                                                                                                                 |

#### Defined in

```typescript
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
```

---

### QueryTableIteratorOptions

Ƭ **QueryTableIteratorOptions**: `Omit`<`QueryCommandInput`, `"TableName"` \| `"ExclusiveStartKey"`\>

#### Defined in

```typescript
export type QueryTableIteratorOptions = Omit<
  QueryCommandInput,
  "TableName" | "ExclusiveStartKey"
>
```

---

### ScanTableIteratorOptions

Ƭ **ScanTableIteratorOptions**: `Omit`<`ScanCommandInput`, `"TableName"` \| `"ExclusiveStartKey"`\>

#### Defined in

```typescript
export type ScanTableIteratorOptions = Omit<
  ScanCommandInput,
  "TableName" | "ExclusiveStartKey"
>
```

---

### TTLValue

Ƭ **TTLValue**: `Object`

#### Type declaration

| Name       | Type     |
| :--------- | :------- |
| `days?`    | `number` |
| `hours?`   | `number` |
| `minutes?` | `number` |
| `seconds?` | `number` |

#### Defined in

```typescript
export type TTLValue = {
  years?: number
  months?: number
  weeks?: number
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
}
```

---

### UpdateCommandOptions

Ƭ **UpdateCommandOptions**: `Object`

Update Command Options

#### Type declaration

| Name           | Type      |
| :------------- | :-------- |
| `ifNotExists?` | `boolean` |

#### Defined in

```typescript
export type UpdateCommandOptions = {
  ifNotExists?: boolean
}
```

## Functions

### collectItems

▸ **collectItems**<`T`\>(`iterator`): `Promise`<`Awaited`<`T`\>[]\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name       | Type                                     |
| :--------- | :--------------------------------------- |
| `iterator` | `AsyncGenerator`<`T`, `any`, `unknown`\> |

#### Returns

`Promise`<`Awaited`<`T`\>[]\>

#### Defined in

```typescript
export async function collectItems<T>(iterator: AsyncGenerator<T>) {
  const result = []
  for await (const item of iterator) {
    result.push(item)
  }
  return result
}
```

---

### concatQueryResults

▸ **concatQueryResults**<`T`\>(`client`, `input`, `options?`): `Promise`<`T`[]\>

Concatenate all query results into an array of items

**`Example`**

```typescript
const input = { TableName: "tableName", ... }
const output = await concatQueryResults(client, input)
```

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name                | Type                     |
| :------------------ | :----------------------- |
| `client`            | `DynamoDBDocumentClient` |
| `input`             | `QueryCommandInput`      |
| `options`           | `Object`                 |
| `options.startKey?` | `object`                 |

#### Returns

`Promise`<`T`[]\>

#### Defined in

```typescript
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
```

---

### createCompoundKey

▸ **createCompoundKey**(`key`): `string`

Create compound key from object

#### Parameters

| Name  | Type                          |
| :---- | :---------------------------- |
| `key` | `Record`<`string`, `string`\> |

#### Returns

`string`

#### Defined in

```typescript
export function createCompoundKey(key: Record<string, string>): string {
  return Object.values(key).join("#")
}
```

---

### createDefaultIdempotencyPersistanceStore

▸ **createDefaultIdempotencyPersistanceStore**(`config?`): `DynamoDBPersistenceLayer`

Helper to create DynamoDB persistance store to keep idempotency records.

**`Example`**

```ts
createDefaultIdempotencyPersistanceStore({
  tableName: "MyIdempotencyTable", // Default is process.env.IDEMPOTENCY_TABLE
  awsSdkV3Client: myDynamoDBClient, // Default is a new instance of DynamoDb client
})
```

#### Parameters

| Name     | Type                                     |
| :------- | :--------------------------------------- |
| `config` | `Partial`<`DynamoDBPersistenceOptions`\> |

#### Returns

`DynamoDBPersistenceLayer`

#### Defined in

```typescript
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
```

---

### createDefaultTableFields

▸ **createDefaultTableFields**(`options?`): [`DefaultTableFields`](README.md#defaulttablefields)

Create values for default table fields

#### Parameters

| Name           | Type                                       |
| :------------- | :----------------------------------------- |
| `options`      | `Object`                                   |
| `options.ttl?` | `null` \| [`TTLValue`](README.md#ttlvalue) |

#### Returns

[`DefaultTableFields`](README.md#defaulttablefields)

#### Defined in

```typescript
export function createDefaultTableFields(
  options: { ttl?: TTLValue | null } = {}
): DefaultTableFields {
  const { ttl } = options
  const currentDate = getCurrentDateTimeISO()

  return {
    createdAt: currentDate,
    updatedAt: currentDate,
    ...(ttl !== undefined && { ttl: createTTL(ttl) }),
  }
}
```

---

### createDynamoDbStreamHandler

▸ **createDynamoDbStreamHandler**<`T`\>(`options`): (`event`: `DynamoDBStreamEvent`, `context`: `Context`) => `Promise`<`void`\>

Create standard Lambda handler for DynamoDB Stream events

**`Examples`**

```ts
const handler = createDynamoDbStreamHandler<TableRecord>(
  onInsert: (record) => handleInsert(record),
  // ...
})
```

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name      | Type                                                                           |
| :-------- | :----------------------------------------------------------------------------- |
| `options` | [`DynamoDbStreamHandlerOptions`](README.md#dynamodbstreamhandleroptions)<`T`\> |

#### Returns

`fn`

▸ (`event`, `context`): `Promise`<`void`\>

##### Parameters

| Name      | Type                  |
| :-------- | :-------------------- |
| `event`   | `DynamoDBStreamEvent` |
| `context` | `Context`             |

##### Returns

`Promise`<`void`\>

#### Defined in

```typescript
export function createDynamoDbStreamHandler<T>(
  options: DynamoDbStreamHandlerOptions<T>
) {
  const {
    logger = defaultLogger,
    idempotencyPersistanceStore,
    idempotencyConfig = {},
    logEvents = true,
  } = options

  // ... handler implementation

  const lambdaHandler = async (
    event: DynamoDBStreamEvent,
    context: Context
  ) => {
    if (logEvents)
      logger.info("Incoming event", { batchSize: event?.Records.length, event })

    config.registerLambdaContext(context)

    if (options.concurrentBatchProcessing) {
      const settled = await Promise.allSettled(
        event.Records.map((record) => dispatchEventToHandler(record))
      )

      if (settled.some((result) => result.status === "rejected")) {
        throw new Error("Some batch items failed")
      }
    } else {
      for (const record of event.Records) {
        await dispatchEventToHandler(record)
      }
    }
  }

  return lambdaHandler
}
```

---

### createTTL

▸ **createTTL**(`ttl`): `number` \| `null`

Create AWS TTL value

#### Parameters

| Name  | Type                                       |
| :---- | :----------------------------------------- |
| `ttl` | `null` \| [`TTLValue`](README.md#ttlvalue) |

#### Returns

`number` \| `null`

#### Defined in

```typescript
export function createTTL(ttl: TTLValue | null): number | null {
  if (ttl === null) return null

  const ttlSeconds =
    (ttl.years || 0) * 365 * 24 * 3600 +
    (ttl.months || 0) * 30 * 24 * 3600 +
    (ttl.weeks || 0) * 7 * 24 * 3600 +
    ((ttl.days || 0) * 24 + (ttl.hours || 0)) * 3600 +
    (ttl.minutes || 0) * 60 +
    (ttl.seconds || 0)

  return Math.floor(Date.now() / 1000) + ttlSeconds
}
```

---

### getCurrentDateTimeISO

▸ **getCurrentDateTimeISO**(`options?`): `string`

Create current date and time in default ISO format.
Default format is supposed to be used to store dates in DynamoDB tables.

#### Parameters

| Name                          | Type     |
| :---------------------------- | :------- |
| `options`                     | `Object` |
| `options.offsetMilliseconds?` | `number` |

#### Returns

`string`

#### Defined in

```typescript
export function getCurrentDateTimeISO(
  options: { offsetMilliseconds?: number } = {}
): string {
  if (options.offsetMilliseconds) {
    const now = Date.now() + options.offsetMilliseconds
    return new Date(now).toISOString()
  } else {
    return new Date().toISOString()
  }
}
```

---

### parseCompoundKey

▸ **parseCompoundKey**<`K`\>(`compoundKey`, `keys`): { [index in K]: string }

Parse compound key into an object

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K`  | extends `string` |

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `compoundKey` | `string` |
| `keys`        | `K`[]    |

#### Returns

{ [index in K]: string }

#### Defined in

```typescript
export function parseCompoundKey<K extends string>(
  compoundKey: string,
  keys: K[]
): { [index in K]: string } {
  const parts = compoundKey.split("#")
  if (parts.length !== keys.length) {
    throw new Error(
      `Cannot parse compound key "${compoundKey}", expected ${keys.length} elements got ${parts.length}.`
    )
  }
  return Object.fromEntries(
    keys.map((key, index) => [key, parts[index]])
  ) as Record<K, string>
}
```

---

### queryItemIterator

▸ **queryItemIterator**(`query`, `options?`): `AsyncGenerator`<`Record`<`string`, `any`\>, `void`, `unknown`\>

Async iterator for single query items.
Executes query and yields each returned item. Repeats until all items are returned.

**`Example`**

```typescript
for await (const item of queryItemIterator((exclusiveStartKey) =>
  doDynamoDBQuery(exclusiveStartKey)
)) {
  console.log(item)
}
```

#### Parameters

| Name                | Type                                                                 |
| :------------------ | :------------------------------------------------------------------- |
| `query`             | (`exclusiveStartKey?`: `object`) => `Promise`<`QueryCommandOutput`\> |
| `options`           | `Object`                                                             |
| `options.startKey?` | `object`                                                             |

#### Returns

`AsyncGenerator`<`Record`<`string`, `any`\>, `void`, `unknown`\>

#### Defined in

```typescript
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
```

---

### queryIterator

▸ **queryIterator**(`query`, `options?`): `AsyncGenerator`<`Record`<`string`, `any`\>[], `void`, `unknown`\>

Async iterator for query items.
Executes query and yields array of returned items. Repeats until all items are returned.

**`Example`**

```typescript
for await (const items of queryIterator((exclusiveStartKey) =>
  doDynamoDBQuery(exclusiveStartKey)
)) {
  console.log(items)
}
```

#### Parameters

| Name                | Type                                                                 |
| :------------------ | :------------------------------------------------------------------- |
| `query`             | (`exclusiveStartKey?`: `object`) => `Promise`<`QueryCommandOutput`\> |
| `options`           | `Object`                                                             |
| `options.startKey?` | `object`                                                             |

#### Returns

`AsyncGenerator`<`Record`<`string`, `any`\>[], `void`, `unknown`\>

#### Defined in

```typescript
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
```

---

### queryTableIterator

▸ **queryTableIterator**<`T`\>(`client`, `tableName`, `startKey?`, `options?`): `AsyncGenerator`<`Awaited`<`T`\>, `void`, `unknown`\>

Create asynchronous iterator to query all items of a table

#### Type parameters

| Name | Type      |
| :--- | :-------- |
| `T`  | `unknown` |

#### Parameters

| Name        | Type                                                               |
| :---------- | :----------------------------------------------------------------- |
| `client`    | `DynamoDBDocumentClient`                                           |
| `tableName` | `string`                                                           |
| `startKey?` | `object`                                                           |
| `options`   | [`QueryTableIteratorOptions`](README.md#querytableiteratoroptions) |

#### Returns

`AsyncGenerator`<`Awaited`<`T`\>, `void`, `unknown`\>

#### Defined in

```typescript
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
```

---

### retryBatchGetCommand

▸ **retryBatchGetCommand**(`client`, `requestItems`): `AsyncGenerator`<`BatchGetCommandOutput`, `void`, `unknown`\>

Async generator to perform GetBatchCommand and handle unprocessed keys with retries

#### Parameters

| Name           | Type                                                                                                                                 |
| :------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `client`       | `DynamoDBDocumentClient`                                                                                                             |
| `requestItems` | `undefined` \| `Record`<`string`, `Omit`<`KeysAndAttributes`, `"Keys"`\> & { `Keys`: `undefined` \| `Record`<`string`, `any`\>[] }\> |

#### Returns

`AsyncGenerator`<`BatchGetCommandOutput`, `void`, `unknown`\>

#### Defined in

```typescript
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
```

---

### scanTableIterator

▸ **scanTableIterator**<`T`\>(`client`, `tableName`, `startKey?`, `options?`): `AsyncGenerator`<`Awaited`<`T`\>, `void`, `unknown`\>

Create asynchronous iterator to scan all items of a table

#### Type parameters

| Name | Type      |
| :--- | :-------- |
| `T`  | `unknown` |

#### Parameters

| Name        | Type                                                             |
| :---------- | :--------------------------------------------------------------- |
| `client`    | `DynamoDBDocumentClient`                                         |
| `tableName` | `string`                                                         |
| `startKey?` | `object`                                                         |
| `options`   | [`ScanTableIteratorOptions`](README.md#scantableiteratoroptions) |

#### Returns

`AsyncGenerator`<`Awaited`<`T`\>, `void`, `unknown`\>

#### Defined in

```typescript
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
```

---

### splitToBatches

▸ **splitToBatches**<`T`\>(`arr`, `batchSize?`): `Generator`<`T`[], `void`, `unknown`\>

Generator to split an array into smaller arrays containing max batchSize items

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name        | Type     | Default value |
| :---------- | :------- | :------------ |
| `arr`       | `T`[]    | `undefined`   |
| `batchSize` | `number` | `25`          |

#### Returns

`Generator`<`T`[], `void`, `unknown`\>

#### Defined in

```typescript
export function* splitToBatches<T>(arr: T[], batchSize = 25) {
  let start = 0
  while (start < arr.length) {
    const end = start + batchSize
    yield arr.slice(start, end)
    start = end
  }
}
```
