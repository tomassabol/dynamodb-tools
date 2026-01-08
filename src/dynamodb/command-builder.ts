import assert from "assert"

/**
 * Abstract base class for DynamoDB command builders.
 */

export abstract class CommandBuilder<T extends Record<string, unknown>> {
  protected expressionAttributeNames: Record<string, string> = {}
  protected expressionAttributeValues: Record<string, unknown> = {}

  /**
   * Create new attribute name #attr = attr
   */

  protected createAttributeName(attr: keyof T): string {
    assert(typeof attr === "string", "Invalid attribute")
    const attrName = "#" + attr

    this.expressionAttributeNames[attrName] = attr

    return attrName
  }

  /**
   * Create new attribute value :name = value
   */

  protected createAttributeValue(name: string, value: unknown): string {
    let valueName = ":" + name

    if (
      Object.hasOwn(this.expressionAttributeValues, valueName) &&
      this.expressionAttributeValues[valueName] !== value
    ) {
      const index = Object.keys(this.expressionAttributeValues).length // Create unique index
      valueName = `${valueName}_${index}`
    }

    this.expressionAttributeValues[valueName] = value

    return valueName
  }

  /**
   * Create new attribute name and value: #attr = attr, :attr = value
   */

  protected createAttributeNameAndValue(attr: keyof T, value: unknown) {
    assert(typeof attr === "string", "Invalid attribute")

    const attrName = this.createAttributeName(attr)
    const valueName = this.createAttributeValue(attr, value)

    return { attrName, valueName }
  }
}
