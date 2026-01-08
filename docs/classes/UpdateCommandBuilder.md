[@gymbeam/dynamodb-tools](../README.md) / UpdateCommandBuilder

# Class: UpdateCommandBuilder<T\>

Builder for update expression in DynamoDB update command

**`Example`**

```typescript
const builder = new UpdateCommandBuilder("table", { key: "value" })

builder.setAttributeValue("message", "hello")
builder.addValueToAttribute("count", 1)

const command = new UpdateCommand(builder.buildCommandInput())
await documentClient.client.send(command)
```

## Type parameters

| Name | Type                                   |
| :--- | :------------------------------------- |
| `T`  | extends `Record`<`string`, `unknown`\> |

## Hierarchy

- `CommandBuilder`<`T`\>

  ↳ **`UpdateCommandBuilder`**

## Table of contents

### Constructors

- [constructor](UpdateCommandBuilder.md#constructor)

### Methods

- [addCondition](UpdateCommandBuilder.md#addcondition)
- [addValueToAttribute](UpdateCommandBuilder.md#addvaluetoattribute)
- [buildCommandInput](UpdateCommandBuilder.md#buildcommandinput)
- [ifAttributeExists](UpdateCommandBuilder.md#ifattributeexists)
- [ifAttributeNotExists](UpdateCommandBuilder.md#ifattributenotexists)
- [removeAttribute](UpdateCommandBuilder.md#removeattribute)
- [setAttributeValue](UpdateCommandBuilder.md#setattributevalue)
- [setAttributesValues](UpdateCommandBuilder.md#setattributesvalues)

## Constructors

### constructor

• **new UpdateCommandBuilder**<`T`\>(`tableName`, `key`, `options?`)

#### Type parameters

| Name | Type                                   |
| :--- | :------------------------------------- |
| `T`  | extends `Record`<`string`, `unknown`\> |

#### Parameters

| Name        | Type                                      |
| :---------- | :---------------------------------------- |
| `tableName` | `string`                                  |
| `key`       | `undefined` \| `Record`<`string`, `any`\> |
| `options`   | `Partial`<`UpdateCommandInput`\>          |

#### Overrides

CommandBuilder&lt;T\&gt;.constructor

#### Defined in

[src/dynamodb/update-command-builder.ts:44](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/dynamodb/update-command-builder.ts#lines-44)

## Methods

### addCondition

▸ **addCondition**<`K`, `O`\>(`attr`, `operator`, `value`, `options?`): [`UpdateCommandBuilder`](UpdateCommandBuilder.md)<`T`\>

#### Type parameters

| Name | Type                                                          |
| :--- | :------------------------------------------------------------ |
| `K`  | extends `string` \| `number` \| `symbol`                      |
| `O`  | extends [`ConditionOperator`](../README.md#conditionoperator) |

#### Parameters

| Name           | Type                                       |
| :------------- | :----------------------------------------- |
| `attr`         | `K`                                        |
| `operator`     | `O`                                        |
| `value`        | `O` extends `"IN"` ? `T`[`K`][] : `T`[`K`] |
| `options`      | `Object`                                   |
| `options.not?` | `boolean`                                  |

#### Returns

[`UpdateCommandBuilder`](UpdateCommandBuilder.md)<`T`\>

#### Defined in

[src/dynamodb/update-command-builder.ts:135](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/dynamodb/update-command-builder.ts#lines-135)

---

### addValueToAttribute

▸ **addValueToAttribute**(`attr`, `value`): [`UpdateCommandBuilder`](UpdateCommandBuilder.md)<`T`\>

Add numeric value to attribute.
Note: if attribute has no value, DynamoDB assumes value to be zero.

#### Parameters

| Name    | Type      |
| :------ | :-------- |
| `attr`  | keyof `T` |
| `value` | `number`  |

#### Returns

[`UpdateCommandBuilder`](UpdateCommandBuilder.md)<`T`\>

#### Defined in

[src/dynamodb/update-command-builder.ts:107](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/dynamodb/update-command-builder.ts#lines-107)

---

### buildCommandInput

▸ **buildCommandInput**(): `UpdateCommandInput`

#### Returns

`UpdateCommandInput`

#### Defined in

[src/dynamodb/update-command-builder.ts:172](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/dynamodb/update-command-builder.ts#lines-172)

---

### ifAttributeExists

▸ **ifAttributeExists**(`attr`): [`UpdateCommandBuilder`](UpdateCommandBuilder.md)<`T`\>

Create condition that an attribute exist

#### Parameters

| Name   | Type      |
| :----- | :-------- |
| `attr` | keyof `T` |

#### Returns

[`UpdateCommandBuilder`](UpdateCommandBuilder.md)<`T`\>

#### Defined in

[src/dynamodb/update-command-builder.ts:120](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/dynamodb/update-command-builder.ts#lines-120)

---

### ifAttributeNotExists

▸ **ifAttributeNotExists**(`attr`): [`UpdateCommandBuilder`](UpdateCommandBuilder.md)<`T`\>

Create condition that an attribute does not exist

#### Parameters

| Name   | Type      |
| :----- | :-------- |
| `attr` | keyof `T` |

#### Returns

[`UpdateCommandBuilder`](UpdateCommandBuilder.md)<`T`\>

#### Defined in

[src/dynamodb/update-command-builder.ts:129](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/dynamodb/update-command-builder.ts#lines-129)

---

### removeAttribute

▸ **removeAttribute**(`attr`): [`UpdateCommandBuilder`](UpdateCommandBuilder.md)<`T`\>

Delete attribute

#### Parameters

| Name   | Type      |
| :----- | :-------- |
| `attr` | keyof `T` |

#### Returns

[`UpdateCommandBuilder`](UpdateCommandBuilder.md)<`T`\>

#### Defined in

[src/dynamodb/update-command-builder.ts:82](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/dynamodb/update-command-builder.ts#lines-82)

---

### setAttributeValue

▸ **setAttributeValue**(`attr`, `value`, `options?`): [`UpdateCommandBuilder`](UpdateCommandBuilder.md)<`T`\>

Set value of an attribute

#### Parameters

| Name      | Type                                                        |
| :-------- | :---------------------------------------------------------- |
| `attr`    | keyof `T`                                                   |
| `value`   | `unknown`                                                   |
| `options` | [`UpdateCommandOptions`](../README.md#updatecommandoptions) |

#### Returns

[`UpdateCommandBuilder`](UpdateCommandBuilder.md)<`T`\>

#### Defined in

[src/dynamodb/update-command-builder.ts:61](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/dynamodb/update-command-builder.ts#lines-61)

---

### setAttributesValues

▸ **setAttributesValues**(`obj`, `options?`): [`UpdateCommandBuilder`](UpdateCommandBuilder.md)<`T`\>

Set values for many attributes based on object with attributes as properties

#### Parameters

| Name      | Type                                                        |
| :-------- | :---------------------------------------------------------- |
| `obj`     | `Partial`<`Record`<keyof `T`, `unknown`\>\>                 |
| `options` | [`UpdateCommandOptions`](../README.md#updatecommandoptions) |

#### Returns

[`UpdateCommandBuilder`](UpdateCommandBuilder.md)<`T`\>

#### Defined in

[src/dynamodb/update-command-builder.ts:92](https://bitbucket.org/gymbeamdev/dynamodb-tools/src/d5f341b/src/dynamodb/update-command-builder.ts#lines-92)
