import { QueryCommandInput } from "@aws-sdk/lib-dynamodb"
import { CommandBuilder } from "./command-builder"
import assert from "assert"

type ArrayKeys<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof T]: T[K] extends readonly any[] ? K : never
}[keyof T]

/**
 * Builder for update expression in DynamoDB update command
 *
 * @example
 * ```typescript
 * const builder = new QueryCommandBuilder<MyTableRecord>("table")
 *
 * const input = builder
 *   .partitionKeyEquals("pk", "12345")
 *   .buildCommandInput()
 * const command = new QueryCommand(input)
 * await documentClient.client.send(command)
 * ```
 */

export class QueryCommandBuilder<
  T extends Record<string, unknown>
> extends CommandBuilder<T> {
  private partitionKeyExpression = ""
  private sortKeyExpression = ""
  private projectionExpression: string[] = []
  private filterExpression: string[] = []
  private commandOptions: Omit<
    QueryCommandInput,
    | "KeyConditionExpression"
    | "ExpressionAttributeNames"
    | "ExpressionAttributeValues"
  >

  constructor(tableName: string, options: Partial<QueryCommandInput> = {}) {
    super()
    this.commandOptions = {
      ...options,
      TableName: tableName,
    }
  }

  /**
   * Add key condition for partition key
   */

  public partitionKeyEquals<K extends keyof T>(attr: K, value: T[K]) {
    const { attrName, valueName } = this.createAttributeNameAndValue(
      attr,
      value
    )

    if (this.partitionKeyExpression)
      throw new Error("Max one partition key condition is allowed")
    this.partitionKeyExpression = `${attrName} = ${valueName}`
    return this
  }

  /**
   * Add key condition for sort key
   */
  public sortKeyCondition<K extends keyof T>(
    attr: K,
    operator: "=" | "<" | "<=" | ">" | ">=" | "begins_with",
    value: T[K]
  ) {
    const { attrName, valueName } = this.createAttributeNameAndValue(
      attr,
      value
    )

    if (this.sortKeyExpression)
      throw new Error("Max one sort key condition is allowed")

    this.sortKeyExpression =
      operator === "begins_with"
        ? `begins_with(${attrName}, ${valueName})`
        : `${attrName} ${operator} ${valueName}`
    return this
  }

  /**
   * Add filter expression condition
   *
   * @examples
   * ```ts
   *   builder
   *     .addFilterCondition("attr1", ">", 10)         // attr3 > 10
   *     .addFilterCondition("attr2", "IN", [1, 2, 3]) // attr2 IN (1, 2, 3)
   *     .addFilterCondition("attr3", "IN", [1, 2, 3], { not: true }) // NOT (attr3 IN (1, 2, 3))
   * ```
   */

  // Signature for IN operator
  public addFilterCondition<K extends keyof T>(
    attr: K,
    operator: "IN",
    value: T[K][],
    options?: { not?: boolean }
  ): this
  // Signature for comparison operators
  public addFilterCondition<K extends keyof T>(
    attr: K,
    operator: "=" | "<" | "<=" | ">" | ">=" | "<>",
    value: T[K],
    options?: { not?: boolean }
  ): this
  public addFilterCondition<K extends keyof T>(
    attr: K,
    operator: "=" | "<" | "<=" | ">" | ">=" | "<>" | "IN",
    value: T[K] | T[K][],
    options: { not?: boolean } = {}
  ): this {
    // See https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.OperatorsAndFunctions.html#Expressions.OperatorsAndFunctions.Syntax

    assert(typeof attr === "string", "Invalid attribute")

    const attrName = this.createAttributeName(attr)

    const expectArrayOfValues = operator === "IN"

    const valueArr = Array.isArray(value) ? value : [value]

    if (valueArr.length > 1 && !expectArrayOfValues) {
      throw new Error(
        "QueryCommandBuilder.addFilterCondition: invalid value - array not expected for this operation"
      )
    }

    const valueNames = valueArr.map((value) =>
      this.createAttributeValue(attr as string, value)
    )

    const rightOperand = expectArrayOfValues
      ? `(${valueNames.join(", ")})`
      : valueNames[0]

    const condition = `${attrName} ${operator} ${rightOperand}`
    const expression = options.not ? `NOT (${condition})` : condition

    this.filterExpression.push(expression)
    return this
  }

  /**
   * Add existential filter expression condition
   */

  public addExistentialFilterCondition<K extends keyof T>(
    attr: K,
    operator: "exists" | "not_exists"
  ) {
    // See https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.OperatorsAndFunctions.html#Expressions.OperatorsAndFunctions.Syntax

    let existentialExpression: string | undefined
    const attributeName = this.createAttributeName(attr)

    if (operator === "exists") {
      existentialExpression = `attribute_exists(${attributeName})`
    }

    if (operator === "not_exists") {
      existentialExpression = `attribute_not_exists(${attributeName})`
    }

    if (existentialExpression) this.filterExpression.push(existentialExpression)
    return this
  }

  /**
   * Add filter condition based on array size using DynamoDB's size() function.
   *
   * @param attr - The attribute to filter by size (should be an array)
   * @param condition - The size condition with value and operator
   * @param options - Optional settings like negation
   *
   * @example
   * ```typescript
   * // Filter by array size
   * builder.addArraySizeFilterCondition("shipmentItems", { value: 5, operator: ">" })
   * // Generates: size(#shipmentItems) > :shipmentItems
   *
   * // Works with all comparison operators
   * builder.addArraySizeFilterCondition("tags", { value: 0, operator: "<>" })
   * builder.addArraySizeFilterCondition("items", { value: 10, operator: "<=" })
   *
   * // Can be negated
   * builder.addArraySizeFilterCondition("items", { value: 0, operator: "=" }, { not: true })
   * ```
   */
  public addArraySizeFilterCondition<K extends ArrayKeys<T>>(
    attr: K,
    condition: {
      value: number
      operator: "=" | "<>" | "<" | "<=" | ">" | ">="
    },
    options: { not?: boolean } = {}
  ): this {
    assert(typeof attr === "string", "Invalid attribute")

    const attrName = this.createAttributeName(attr)
    const valueName = this.createAttributeValue(attr as string, condition.value)

    const filterExpression = `size(${attrName}) ${condition.operator} ${valueName}`
    const expression = options.not
      ? `NOT (${filterExpression})`
      : filterExpression

    this.filterExpression.push(expression)
    return this
  }

  /**
   * Add attributes which should be returned in result (by default all attributes are returned).
   */

  public addProjectionAttributes(attrs: Array<keyof T>) {
    attrs.forEach((attr) => {
      const attrName = this.createAttributeName(attr)
      this.projectionExpression.push(attrName)
    })
    return this
  }

  /**
   * Build command input
   */

  public buildCommandInput(): QueryCommandInput {
    if (!this.partitionKeyExpression) {
      throw new Error("Missing partition key condition")
    }

    const keyConditionExpression = this.sortKeyExpression
      ? `${this.partitionKeyExpression} AND ${this.sortKeyExpression}`
      : this.partitionKeyExpression

    return {
      ...this.commandOptions,
      KeyConditionExpression: keyConditionExpression,
      ExpressionAttributeNames: this.expressionAttributeNames,
      ExpressionAttributeValues: this.expressionAttributeValues,
      ...(this.projectionExpression.length > 0 && {
        Select: "SPECIFIC_ATTRIBUTES",
        ProjectionExpression: this.projectionExpression.join(", "),
      }),
      ...(this.filterExpression.length > 0 && {
        FilterExpression: this.filterExpression.join(" AND "),
      }),
    }
  }
}
