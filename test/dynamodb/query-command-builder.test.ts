import { QueryCommandBuilder } from "../../src/dynamodb/query-command-builder"

describe("partitionKeyEquals", () => {
  test("partition key equals", () => {
    const builder = new QueryCommandBuilder("table")

    expect(
      builder.partitionKeyEquals("pk", "value1").buildCommandInput()
    ).toEqual({
      ExpressionAttributeNames: {
        "#pk": "pk",
      },
      ExpressionAttributeValues: {
        ":pk": "value1",
      },
      KeyConditionExpression: "#pk = :pk",
      TableName: "table",
    })
  })

  test("sortKeyCondition", () => {
    const builder = new QueryCommandBuilder("table")

    expect(
      builder
        .partitionKeyEquals("pk", "value1")
        .sortKeyCondition("sk", ">", "value2")
        .buildCommandInput()
    ).toEqual({
      ExpressionAttributeNames: {
        "#pk": "pk",
        "#sk": "sk",
      },
      ExpressionAttributeValues: {
        ":pk": "value1",
        ":sk": "value2",
      },
      KeyConditionExpression: "#pk = :pk AND #sk > :sk",
      TableName: "table",
    })
  })

  test("sortKeyCondition begins_with", () => {
    const builder = new QueryCommandBuilder("table")

    expect(
      builder
        .partitionKeyEquals("pk", "value1")
        .sortKeyCondition("sk", "begins_with", "start")
        .buildCommandInput()
    ).toEqual({
      ExpressionAttributeNames: {
        "#pk": "pk",
        "#sk": "sk",
      },
      ExpressionAttributeValues: {
        ":pk": "value1",
        ":sk": "start",
      },
      KeyConditionExpression: "#pk = :pk AND begins_with(#sk, :sk)",
      TableName: "table",
    })
  })

  test("addProjectionAttributes", () => {
    const builder = new QueryCommandBuilder("table")

    expect(
      builder
        .partitionKeyEquals("pk", "value1")
        .addProjectionAttributes(["pk", "sk"])
        .buildCommandInput()
    ).toEqual({
      ExpressionAttributeNames: {
        "#pk": "pk",
        "#sk": "sk",
      },
      ExpressionAttributeValues: {
        ":pk": "value1",
      },
      KeyConditionExpression: "#pk = :pk",
      ProjectionExpression: "#pk, #sk",
      Select: "SPECIFIC_ATTRIBUTES",
      TableName: "table",
    })
  })

  test("double partition key condition should fail", () => {
    const builder = new QueryCommandBuilder("table")

    expect(() =>
      builder
        .partitionKeyEquals("pk", "value1")
        .partitionKeyEquals("pk", "value1")
        .buildCommandInput()
    ).toThrow(/Max one partition key condition is allowed/)
  })

  test("sortKeyCompare - double sort key condition should fail", () => {
    const builder = new QueryCommandBuilder("table")

    expect(() =>
      builder
        .partitionKeyEquals("pk", "value1")
        .sortKeyCondition("sk", "begins_with", "value1")
        .sortKeyCondition("sk", "=", "value1")
        .buildCommandInput()
    ).toThrow(/Max one sort key condition is allowed/)
  })

  test("missing partition key condition should fail", () => {
    const builder = new QueryCommandBuilder("table")

    expect(() =>
      builder.sortKeyCondition("sk", "=", "value1").buildCommandInput()
    ).toThrow(/Missing partition key condition/)
  })

  test("addFilterCondition", () => {
    const builder = new QueryCommandBuilder("table")

    expect(
      builder
        .partitionKeyEquals("pk", "value1")
        .addFilterCondition("attr1", ">", 10)
        .addFilterCondition("attr2", "=", 20, { not: true })
        .addFilterCondition("attr3", "IN", [1, 2, 3])
        .addFilterCondition("attr4", "IN", ["a", "b", "c"], { not: true })
        .buildCommandInput()
    ).toEqual({
      ExpressionAttributeNames: {
        "#pk": "pk",
        "#attr1": "attr1",
        "#attr2": "attr2",
        "#attr3": "attr3",
        "#attr4": "attr4",
      },
      ExpressionAttributeValues: {
        ":pk": "value1",
        ":attr1": 10,
        ":attr2": 20,
        ":attr3": 1,
        ":attr3_4": 2,
        ":attr3_5": 3,
        ":attr4": "a",
        ":attr4_7": "b",
        ":attr4_8": "c",
      },
      KeyConditionExpression: "#pk = :pk",
      FilterExpression:
        "#attr1 > :attr1 AND NOT (#attr2 = :attr2) AND #attr3 IN (:attr3, :attr3_4, :attr3_5) AND NOT (#attr4 IN (:attr4, :attr4_7, :attr4_8))",
      TableName: "table",
    })
  })

  test("addExistentialFilterCondition", () => {
    const builder = new QueryCommandBuilder("table")

    expect(
      builder
        .partitionKeyEquals("pk", "value1")
        .addExistentialFilterCondition("attr1", "exists")
        .addExistentialFilterCondition("attr2", "not_exists")
        .buildCommandInput()
    ).toEqual({
      ExpressionAttributeNames: {
        "#pk": "pk",
        "#attr1": "attr1",
        "#attr2": "attr2",
      },
      ExpressionAttributeValues: {
        ":pk": "value1",
      },
      KeyConditionExpression: "#pk = :pk",
      FilterExpression:
        "attribute_exists(#attr1) AND attribute_not_exists(#attr2)",
      TableName: "table",
    })
  })

  test("addArraySizeFilterCondition", () => {
    type TestTable = {
      pk: string
      sk: string
      items: string[]
    }
    const builder = new QueryCommandBuilder<TestTable>("table")

    expect(
      builder
        .partitionKeyEquals("pk", "value1")
        .addArraySizeFilterCondition("items", { value: 1, operator: "=" })
        .buildCommandInput()
    ).toEqual({
      ExpressionAttributeNames: {
        "#pk": "pk",
        "#items": "items",
      },
      ExpressionAttributeValues: {
        ":pk": "value1",
        ":items": 1,
      },
      KeyConditionExpression: "#pk = :pk",
      FilterExpression: "size(#items) = :items",
      TableName: "table",
    })
  })

  test("addArraySizeFilterCondition with not", () => {
    type TestTable = {
      pk: string
      sk: string
      items: string[]
    }
    const builder = new QueryCommandBuilder<TestTable>("table")

    expect(
      builder
        .partitionKeyEquals("pk", "value1")
        .addArraySizeFilterCondition(
          "items",
          { value: 1, operator: "=" },
          { not: true }
        )
        .buildCommandInput()
    ).toEqual({
      ExpressionAttributeNames: {
        "#pk": "pk",
        "#items": "items",
      },
      ExpressionAttributeValues: {
        ":pk": "value1",
        ":items": 1,
      },
      KeyConditionExpression: "#pk = :pk",
      FilterExpression: "NOT (size(#items) = :items)",
      TableName: "table",
    })
  })
})
