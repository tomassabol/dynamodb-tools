/**
 * Create current date and time in default ISO format.
 * Default format is supposed to be used to store dates in DynamoDB tables.
 */

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
