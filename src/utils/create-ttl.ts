/**
 * Create AWS TTL value
 */

export function createTTL(ttl: TTLValue | null): number | null {
  if (ttl === null) return null

  const ttlSeconds =
    (ttl.years || 0) * 365 * 24 * 3600 +
    (ttl.months || 0) * 30 * 24 * 3600 +
    (ttl.weeks || 0) * 7 * 24 * 3600 +
    ((ttl.days || 0) * 24 + (ttl.hours || 0)) * 3600 +
    (ttl.minutes || 0) * 60 +
    (ttl.seconds || 0)

  return Math.floor(Date.now() / 1000) + ttlSeconds
}

export type TTLValue = {
  years?: number
  months?: number
  weeks?: number
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
}
