import { createTTL, TTLValue } from "../utils/create-ttl"
import { getCurrentDateTimeISO } from "../utils/date-time"

/**
 * Default fields added to tables
 */

export type DefaultTableFields = {
  /** Date and time when record was created */
  createdAt: string
  /** Date and time when record was last updated */
  updatedAt: string
  /** Time to live */
  ttl?: number | null
}

/**
 * Create values for default table fields
 */

export function createDefaultTableFields(
  options: { ttl?: TTLValue | null } = {}
): DefaultTableFields {
  const { ttl } = options
  const currentDate = getCurrentDateTimeISO()

  return {
    createdAt: currentDate,
    updatedAt: currentDate,
    ...(ttl !== undefined && { ttl: createTTL(ttl) }),
  }
}
