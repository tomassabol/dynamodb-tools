import { getCurrentDateTimeISO } from "../../src/utils/date-time"

describe("date-time", () => {
  test("getCurrentDateTimeISO", () => {
    jest.useFakeTimers({ now: 1677532302922 })
    expect(getCurrentDateTimeISO()).toBe("2023-02-27T21:11:42.922Z")
  })

  test("getCurrentDateTimeISO with offset", () => {
    jest.useFakeTimers({ now: 1677532302922 })
    expect(getCurrentDateTimeISO({ offsetMilliseconds: 1000 * 60 })).toBe(
      "2023-02-27T21:12:42.922Z"
    )
  })
})
