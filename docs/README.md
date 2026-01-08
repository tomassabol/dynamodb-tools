@gymbeam/dynamodb-tools

# @gymbeam/dynamodb-tools

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

[src/dynamodb/update-command-builder.ts:13](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/dynamodb/update-command-builder.ts#lines-13)

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

[src/dynamodb/default-table-fields.ts:8](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/dynamodb/default-table-fields.ts#lines-8)

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

[src/streams/stream-handler.ts:176](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/streams/stream-handler.ts#lines-176)

---

### QueryTableIteratorOptions

Ƭ **QueryTableIteratorOptions**: `Omit`<`QueryCommandInput`, `"TableName"` \| `"ExclusiveStartKey"`\>

#### Defined in

[src/dynamodb/iterators.ts:9](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/dynamodb/iterators.ts#lines-9)

---

### ScanTableIteratorOptions

Ƭ **ScanTableIteratorOptions**: `Omit`<`ScanCommandInput`, `"TableName"` \| `"ExclusiveStartKey"`\>

#### Defined in

[src/dynamodb/iterators.ts:14](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/dynamodb/iterators.ts#lines-14)

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

[src/utils/create-ttl.ts:16](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/utils/create-ttl.ts#lines-16)

---

### UpdateCommandOptions

Ƭ **UpdateCommandOptions**: `Object`

Update Command Options

#### Type declaration

| Name           | Type      |
| :------------- | :-------- |
| `ifNotExists?` | `boolean` |

#### Defined in

[src/dynamodb/update-command-builder.ts:9](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/dynamodb/update-command-builder.ts#lines-9)

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

[src/dynamodb/iterators.ts:81](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/dynamodb/iterators.ts#lines-81)

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

[src/dynamodb/query-iterator.ts:71](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/dynamodb/query-iterator.ts#lines-71)

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

[src/utils/compound-key.ts:5](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/utils/compound-key.ts#lines-5)

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

[src/streams/stream-handler.ts:233](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/streams/stream-handler.ts#lines-233)

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

[src/dynamodb/default-table-fields.ts:21](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/dynamodb/default-table-fields.ts#lines-21)

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

[src/streams/stream-handler.ts:30](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/streams/stream-handler.ts#lines-30)

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

[src/utils/create-ttl.ts:5](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/utils/create-ttl.ts#lines-5)

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

[src/utils/date-time.ts:6](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/utils/date-time.ts#lines-6)

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

[src/utils/compound-key.ts:13](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/utils/compound-key.ts#lines-13)

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

[src/dynamodb/query-iterator.ts:48](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/dynamodb/query-iterator.ts#lines-48)

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

[src/dynamodb/query-iterator.ts:20](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/dynamodb/query-iterator.ts#lines-20)

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

[src/dynamodb/iterators.ts:23](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/dynamodb/iterators.ts#lines-23)

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

[src/dynamodb/get-many.ts:24](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/dynamodb/get-many.ts#lines-24)

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

[src/dynamodb/iterators.ts:54](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/dynamodb/iterators.ts#lines-54)

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

[src/dynamodb/get-many.ts:11](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/dynamodb/get-many.ts#lines-11)
