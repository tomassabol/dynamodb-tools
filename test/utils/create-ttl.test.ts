import { createTTL } from "../../src/utils/create-ttl"

describe("create-ttl", () => {
  test("createTTL null", () => {
    jest.useFakeTimers({ now: 1677532302922 })
    expect(createTTL(null)).toBeNull()
  })

  test("createTTL days", () => {
    jest.useFakeTimers({ now: 1677532302922 })
    expect(createTTL({ days: 1 })).toBe(1677532302 + 24 * 3600)
  })

  test("createTTL hours", () => {
    jest.useFakeTimers({ now: 1677532302922 })
    expect(createTTL({ hours: 1 })).toBe(1677532302 + 3600)
  })

  test("createTTL minutes", () => {
    jest.useFakeTimers({ now: 1677532302922 })
    expect(createTTL({ minutes: 1 })).toBe(1677532302 + 60)
  })

  test("createTTL seconds", () => {
    jest.useFakeTimers({ now: 1677532302922 })
    expect(createTTL({ seconds: 1 })).toBe(1677532302 + 1)
  })

  test("createTTL mixed", () => {
    jest.useFakeTimers({ now: 1677532302922 })
    expect(createTTL({ days: 1, hours: 1, minutes: 1, seconds: 1 })).toBe(
      1677532302 + 24 * 3600 + 3600 + 60 + 1
    )
  })
})
