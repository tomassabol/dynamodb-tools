import { UpdateCommandBuilder } from "../../src/dynamodb/update-command-builder"

describe("update-command-builder", () => {
  test("setAttributeValue", () => {
    const builder = new UpdateCommandBuilder("table", { pk: "12345" })

    builder.setAttributeValue("attr", "value")

    expect(builder.buildCommandInput()).toEqual({
      TableName: "table",
      Key: { pk: "12345" },
      UpdateExpression: "SET #attr = :attr ",
      ExpressionAttributeNames: { "#attr": "attr" },
      ExpressionAttributeValues: { ":attr": "value" },
    })
  })

  test("setAttributeValue ifNotExists", () => {
    const builder = new UpdateCommandBuilder("table", { pk: "12345" })

    builder.setAttributeValue("attr", "value", { ifNotExists: true })

    expect(builder.buildCommandInput()).toEqual({
      TableName: "table",
      Key: { pk: "12345" },
      UpdateExpression: "SET #attr = if_not_exists(#attr, :attr) ",
      ExpressionAttributeNames: { "#attr": "attr" },
      ExpressionAttributeValues: { ":attr": "value" },
    })
  })

  test("list append", () => {
    const builder = new UpdateCommandBuilder("table", { pk: "12345" })

    builder.listAppend("attr", ["value1", "value2"])

    expect(builder.buildCommandInput()).toEqual({
      TableName: "table",
      Key: { pk: "12345" },
      UpdateExpression: "SET #attr = list_append(#attr, :attr) ",
      ExpressionAttributeNames: { "#attr": "attr" },
      ExpressionAttributeValues: { ":attr": ["value1", "value2"] },
    })
  })

  test("setAttributesValues", () => {
    const builder = new UpdateCommandBuilder("table", { pk: "12345" })

    builder.setAttributesValues({ attr1: "value1", attr2: "value2" })

    expect(builder.buildCommandInput()).toEqual({
      TableName: "table",
      Key: { pk: "12345" },
      UpdateExpression: "SET #attr1 = :attr1, #attr2 = :attr2 ",
      ExpressionAttributeNames: { "#attr1": "attr1", "#attr2": "attr2" },
      ExpressionAttributeValues: { ":attr1": "value1", ":attr2": "value2" },
    })
  })

  test("setAttributesValues ifNotExists", () => {
    const builder = new UpdateCommandBuilder("table", { pk: "12345" })

    builder.setAttributesValues(
      { attr1: "value1", attr2: "value2" },
      { ifNotExists: true }
    )

    expect(builder.buildCommandInput()).toEqual({
      TableName: "table",
      Key: { pk: "12345" },
      UpdateExpression:
        "SET #attr1 = if_not_exists(#attr1, :attr1), #attr2 = if_not_exists(#attr2, :attr2) ",
      ExpressionAttributeNames: { "#attr1": "attr1", "#attr2": "attr2" },
      ExpressionAttributeValues: { ":attr1": "value1", ":attr2": "value2" },
    })
  })

  test("addValueToAttribute", () => {
    const builder = new UpdateCommandBuilder("table", { pk: "12345" })

    builder.addValueToAttribute("counter", 1)

    expect(builder.buildCommandInput()).toEqual({
      TableName: "table",
      Key: { pk: "12345" },
      UpdateExpression: "ADD #counter :counter ",
      ExpressionAttributeNames: { "#counter": "counter" },
      ExpressionAttributeValues: { ":counter": 1 },
    })
  })

  test("setAttributeValue and addValueToAttribute", () => {
    const builder = new UpdateCommandBuilder("table", { pk: "12345" })

    builder.setAttributeValue("attr", "value")
    builder.addValueToAttribute("counter", 1)

    expect(builder.buildCommandInput()).toEqual({
      TableName: "table",
      Key: { pk: "12345" },
      UpdateExpression: "SET #attr = :attr ADD #counter :counter ",
      ExpressionAttributeNames: { "#attr": "attr", "#counter": "counter" },
      ExpressionAttributeValues: { ":attr": "value", ":counter": 1 },
    })
  })

  test("with command options", () => {
    const builder = new UpdateCommandBuilder(
      "table",
      { pk: "12345" },
      { ReturnValues: "ALL_NEW" }
    )

    builder.setAttributeValue("attr", "value")

    expect(builder.buildCommandInput()).toEqual({
      TableName: "table",
      Key: { pk: "12345" },
      ReturnValues: "ALL_NEW",
      UpdateExpression: "SET #attr = :attr ",
      ExpressionAttributeNames: { "#attr": "attr" },
      ExpressionAttributeValues: { ":attr": "value" },
    })
  })

  test("ifAttributeExists", () => {
    const builder = new UpdateCommandBuilder("table", { pk: "12345" })

    builder.setAttributeValue("attr", "value").ifAttributeExists("pk")

    expect(builder.buildCommandInput()).toEqual({
      TableName: "table",
      Key: { pk: "12345" },
      UpdateExpression: "SET #attr = :attr ",
      ExpressionAttributeNames: { "#attr": "attr", "#pk": "pk" },
      ExpressionAttributeValues: { ":attr": "value" },
      ConditionExpression: "attribute_exists(#pk)",
    })
  })

  test("ifAttributeNotExists", () => {
    const builder = new UpdateCommandBuilder("table", { pk: "12345" })

    builder.setAttributeValue("attr", "value").ifAttributeNotExists("pk")

    expect(builder.buildCommandInput()).toEqual({
      TableName: "table",
      Key: { pk: "12345" },
      UpdateExpression: "SET #attr = :attr ",
      ExpressionAttributeNames: { "#attr": "attr", "#pk": "pk" },
      ExpressionAttributeValues: { ":attr": "value" },
      ConditionExpression: "attribute_not_exists(#pk)",
    })
  })

  test("addCondition, operator =", () => {
    const builder = new UpdateCommandBuilder("table", { pk: "12345" })

    builder.setAttributeValue("attr", "value").addCondition("c", "=", "0")

    expect(builder.buildCommandInput()).toEqual({
      TableName: "table",
      Key: { pk: "12345" },
      UpdateExpression: "SET #attr = :attr ",
      ExpressionAttributeNames: { "#attr": "attr", "#c": "c" },
      ExpressionAttributeValues: { ":attr": "value", ":c": "0" },
      ConditionExpression: "#c = :c",
    })
  })

  test("addCondition, operator IN", () => {
    const builder = new UpdateCommandBuilder("table", { pk: "12345" })

    builder
      .setAttributeValue("attr", "value")
      .addCondition("c", "IN", ["0", "1"])

    expect(builder.buildCommandInput()).toEqual({
      TableName: "table",
      Key: { pk: "12345" },
      UpdateExpression: "SET #attr = :attr ",
      ExpressionAttributeNames: { "#attr": "attr", "#c": "c" },
      ExpressionAttributeValues: { ":attr": "value", ":c": "0", ":c_2": "1" },
      ConditionExpression: "#c IN (:c, :c_2)",
    })
  })
})
