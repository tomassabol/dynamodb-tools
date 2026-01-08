[@gymbeam/dynamodb-tools](../README.md) / QueryCommandBuilder

# Class: QueryCommandBuilder<T\>

Builder for update expression in DynamoDB update command

**`Example`**

```typescript
const builder = new QueryCommandBuilder<MyTableRecord>("table")

const input = builder.partitionKeyEquals("pk", "12345").buildCommandInput()
const command = new QueryCommand(input)
await documentClient.client.send(command)
```

## Type parameters

| Name | Type                                   |
| :--- | :------------------------------------- |
| `T`  | extends `Record`<`string`, `unknown`\> |

## Hierarchy

- `CommandBuilder`<`T`\>

  ↳ **`QueryCommandBuilder`**

## Table of contents

### Constructors

- [constructor](QueryCommandBuilder.md#constructor)

### Methods

- [addExistentialFilterCondition](QueryCommandBuilder.md#addexistentialfiltercondition)
- [addFilterCondition](QueryCommandBuilder.md#addfiltercondition)
- [addProjectionAttributes](QueryCommandBuilder.md#addprojectionattributes)
- [buildCommandInput](QueryCommandBuilder.md#buildcommandinput)
- [partitionKeyEquals](QueryCommandBuilder.md#partitionkeyequals)
- [sortKeyCondition](QueryCommandBuilder.md#sortkeycondition)

## Constructors

### constructor

• **new QueryCommandBuilder**<`T`\>(`tableName`, `options?`)

#### Type parameters

| Name | Type                                   |
| :--- | :------------------------------------- |
| `T`  | extends `Record`<`string`, `unknown`\> |

#### Parameters

| Name        | Type                            |
| :---------- | :------------------------------ |
| `tableName` | `string`                        |
| `options`   | `Partial`<`QueryCommandInput`\> |

#### Overrides

CommandBuilder&lt;T\&gt;.constructor

#### Defined in

[src/dynamodb/query-command-builder.ts:34](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/dynamodb/query-command-builder.ts#lines-34)

## Methods

### addExistentialFilterCondition

▸ **addExistentialFilterCondition**<`K`\>(`attr`, `operator`): [`QueryCommandBuilder`](QueryCommandBuilder.md)<`T`\>

Add existential filter expression condition

#### Type parameters

| Name | Type                                     |
| :--- | :--------------------------------------- |
| `K`  | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name       | Type                         |
| :--------- | :--------------------------- |
| `attr`     | `K`                          |
| `operator` | `"exists"` \| `"not_exists"` |

#### Returns

[`QueryCommandBuilder`](QueryCommandBuilder.md)<`T`\>

#### Defined in

[src/dynamodb/query-command-builder.ts:148](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/dynamodb/query-command-builder.ts#lines-148)

---

### addFilterCondition

▸ **addFilterCondition**<`K`\>(`attr`, `operator`, `value`, `options?`): [`QueryCommandBuilder`](QueryCommandBuilder.md)<`T`\>

Add filter expression condition

**`Examples`**

```ts
builder
  .addFilterCondition("attr1", ">", 10) // attr3 > 10
  .addFilterCondition("attr2", "IN", [1, 2, 3]) // attr2 IN (1, 2, 3)
  .addFilterCondition("attr3", "IN", [1, 2, 3], { not: true }) // NOT (attr3 IN (1, 2, 3))
```

#### Type parameters

| Name | Type                                     |
| :--- | :--------------------------------------- |
| `K`  | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name           | Type       |
| :------------- | :--------- |
| `attr`         | `K`        |
| `operator`     | `"IN"`     |
| `value`        | `T`[`K`][] |
| `options?`     | `Object`   |
| `options.not?` | `boolean`  |

#### Returns

[`QueryCommandBuilder`](QueryCommandBuilder.md)<`T`\>

#### Defined in

[src/dynamodb/query-command-builder.ts:94](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/dynamodb/query-command-builder.ts#lines-94)

▸ **addFilterCondition**<`K`\>(`attr`, `operator`, `value`, `options?`): [`QueryCommandBuilder`](QueryCommandBuilder.md)<`T`\>

#### Type parameters

| Name | Type                                     |
| :--- | :--------------------------------------- |
| `K`  | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name           | Type                                                  |
| :------------- | :---------------------------------------------------- |
| `attr`         | `K`                                                   |
| `operator`     | `"="` \| `"<"` \| `"<="` \| `">"` \| `">="` \| `"<>"` |
| `value`        | `T`[`K`]                                              |
| `options?`     | `Object`                                              |
| `options.not?` | `boolean`                                             |

#### Returns

[`QueryCommandBuilder`](QueryCommandBuilder.md)<`T`\>

#### Defined in

[src/dynamodb/query-command-builder.ts:101](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/dynamodb/query-command-builder.ts#lines-101)

---

### addProjectionAttributes

▸ **addProjectionAttributes**(`attrs`): [`QueryCommandBuilder`](QueryCommandBuilder.md)<`T`\>

Add attributes which should be returned in result (by default all attributes are returned).

#### Parameters

| Name    | Type        |
| :------ | :---------- |
| `attrs` | keyof `T`[] |

#### Returns

[`QueryCommandBuilder`](QueryCommandBuilder.md)<`T`\>

#### Defined in

[src/dynamodb/query-command-builder.ts:173](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/dynamodb/query-command-builder.ts#lines-173)

---

### buildCommandInput

▸ **buildCommandInput**(): `QueryCommandInput`

Build command input

#### Returns

`QueryCommandInput`

#### Defined in

[src/dynamodb/query-command-builder.ts:185](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/dynamodb/query-command-builder.ts#lines-185)

---

### partitionKeyEquals

▸ **partitionKeyEquals**<`K`\>(`attr`, `value`): [`QueryCommandBuilder`](QueryCommandBuilder.md)<`T`\>

Add key condition for partition key

#### Type parameters

| Name | Type                                     |
| :--- | :--------------------------------------- |
| `K`  | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `attr`  | `K`      |
| `value` | `T`[`K`] |

#### Returns

[`QueryCommandBuilder`](QueryCommandBuilder.md)<`T`\>

#### Defined in

[src/dynamodb/query-command-builder.ts:46](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/dynamodb/query-command-builder.ts#lines-46)

---

### sortKeyCondition

▸ **sortKeyCondition**<`K`\>(`attr`, `operator`, `value`): [`QueryCommandBuilder`](QueryCommandBuilder.md)<`T`\>

Add key condition for sort key

#### Type parameters

| Name | Type                                     |
| :--- | :--------------------------------------- |
| `K`  | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name       | Type                                                           |
| :--------- | :------------------------------------------------------------- |
| `attr`     | `K`                                                            |
| `operator` | `"="` \| `"<"` \| `"<="` \| `">"` \| `">="` \| `"begins_with"` |
| `value`    | `T`[`K`]                                                       |

#### Returns

[`QueryCommandBuilder`](QueryCommandBuilder.md)<`T`\>

#### Defined in

[src/dynamodb/query-command-builder.ts:61](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/dynamodb/query-command-builder.ts#lines-61)
