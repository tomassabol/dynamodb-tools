import { UpdateCommandInput } from "@aws-sdk/lib-dynamodb"
import { CommandBuilder } from "./command-builder"
import assert from "assert"

/**
 * Update Command Options
 */

export type UpdateCommandOptions = {
  ifNotExists?: boolean
}

export type ConditionOperator = "=" | "<" | "<=" | ">" | ">=" | "<>" | "IN"

/**
 * Builder for update expression in DynamoDB update command
 *
 * @example
 * ```typescript
 * const builder = new UpdateCommandBuilder("table", { key: "value" })
 *
 * builder.setAttributeValue("message", "hello")
 * builder.addValueToAttribute("count", 1)
 *
 * const command = new UpdateCommand(builder.buildCommandInput())
 * await documentClient.client.send(command)
 * ```
 */

export class UpdateCommandBuilder<
  T extends Record<string, unknown>
> extends CommandBuilder<T> {
  private setExpressions: string[] = []
  private removeExpressions: string[] = []
  private addExpressions: string[] = []
  private conditionExpressions: string[] = []
  private updateParams: Omit<
    UpdateCommandInput,
    | "UpdateExpression"
    | "ExpressionAttributeNames"
    | "ExpressionAttributeValues"
  >

  constructor(
    tableName: string,
    key: UpdateCommandInput["Key"],
    options: Partial<UpdateCommandInput> = {}
  ) {
    super()
    this.updateParams = {
      ...options,
      TableName: tableName,
      Key: key,
    }
  }

  /**
   * Set value of an attribute
   */

  public setAttributeValue(
    attr: keyof T,
    value: unknown,
    options: UpdateCommandOptions = {}
  ) {
    const { attrName, valueName } = this.createAttributeNameAndValue(
      attr,
      value
    )

    const expression = options.ifNotExists
      ? `${attrName} = if_not_exists(${attrName}, ${valueName})`
      : `${attrName} = ${valueName}`
    this.setExpressions.push(expression)
    return this
  }

  /**
   * Delete attribute
   */

  public removeAttribute(attr: keyof T) {
    const attrName = this.createAttributeName(attr)
    this.removeExpressions.push(attrName)
    return this
  }

  /**
   * Set values for many attributes based on object with attributes as properties
   */

  public setAttributesValues(
    obj: Partial<Record<keyof T, unknown>>,
    options: UpdateCommandOptions = {}
  ) {
    Object.entries(obj).forEach(([key, value]) =>
      this.setAttributeValue(key, value, options)
    )
    return this
  }

  /**
   * Add numeric value to attribute.
   * Note: if attribute has no value, DynamoDB assumes value to be zero.
   */

  public addValueToAttribute(attr: keyof T, value: number) {
    const { attrName, valueName } = this.createAttributeNameAndValue(
      attr,
      value
    )
    const expression = `${attrName} ${valueName}`
    this.addExpressions.push(expression)
    return this
  }

  /**
   * Create condition that an attribute exist
   */
  public ifAttributeExists(attr: keyof T) {
    const attrName = this.createAttributeName(attr)
    this.conditionExpressions.push(`attribute_exists(${attrName})`)
    return this
  }

  /**
   * Create condition that an attribute does not exist
   */
  public ifAttributeNotExists(attr: keyof T) {
    const attrName = this.createAttributeName(attr)
    this.conditionExpressions.push(`attribute_not_exists(${attrName})`)
    return this
  }

  public addCondition<K extends keyof T, O extends ConditionOperator>(
    attr: K,
    operator: O,
    value: O extends "IN" ? T[K][] : T[K],
    options: { not?: boolean } = {}
  ) {
    // See https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.OperatorsAndFunctions.html#Expressions.OperatorsAndFunctions.Syntax

    if (operator === "IN") {
      assert(
        typeof attr === "string",
        "Invalid condition attribute, expected string"
      )
      assert(Array.isArray(value), "Invalid condition value, expected array")

      const attrName = this.createAttributeName(attr)
      const valueNames = value.map((val) =>
        this.createAttributeValue(attr, val)
      )

      const condition = `${attrName} IN (${valueNames.join(", ")})`
      const expression = options.not ? `NOT (${condition})` : condition
      this.conditionExpressions.push(expression)
    } else {
      const { attrName, valueName } = this.createAttributeNameAndValue(
        attr,
        value
      )

      const condition = `${attrName} ${operator} ${valueName}`
      const expression = options.not ? `NOT (${condition})` : condition

      this.conditionExpressions.push(expression)
    }
    return this
  }
  /**
   * Add listAppend method to UpdateCommandBuilder class that appends a value to a list attribute in DynamoDB.
   */

  public listAppend<K extends keyof T>(attr: K, value: T[K]) {
    const { attrName, valueName } = this.createAttributeNameAndValue(
      attr,
      value
    )
    const expression = `${attrName} = list_append(${attrName}, ${valueName})`
    this.setExpressions.push(expression)
    return this
  }

  public buildCommandInput(): UpdateCommandInput {
    let expression = ""
    if (this.setExpressions.length > 0) {
      expression += `SET ${this.setExpressions.join(", ")} `
    }
    if (this.removeExpressions.length > 0) {
      expression += `REMOVE ${this.removeExpressions.join(", ")} `
    }
    if (this.addExpressions.length > 0) {
      expression += `ADD ${this.addExpressions.join(", ")} `
    }

    let condition
    if (this.conditionExpressions.length > 0) {
      condition = this.conditionExpressions.join(" AND ")
    }
    return {
      ...this.updateParams,
      UpdateExpression: expression,
      ExpressionAttributeNames: this.expressionAttributeNames,
      ExpressionAttributeValues: this.expressionAttributeValues,
      ...(condition && { ConditionExpression: condition }),
    }
  }
}
