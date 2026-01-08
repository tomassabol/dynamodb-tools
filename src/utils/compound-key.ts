/**
 * Create compound key from object
 */

export function createCompoundKey(key: Record<string, string>): string {
  return Object.values(key).join("#")
}

/**
 * Parse compound key into an object
 */

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
