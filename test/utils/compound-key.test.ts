import {
  createCompoundKey,
  parseCompoundKey,
} from "../../src/utils/compound-key"

describe("compound-key", () => {
  test("createCompoundKey success", () => {
    expect(createCompoundKey({ a: "1", b: "2" })).toBe("1#2")
  })

  test("parseCompoundKey success", () => {
    expect(parseCompoundKey("1#2#3", ["a", "b", "c"])).toEqual({
      a: "1",
      b: "2",
      c: "3",
    })
  })

  test("parseCompoundKey fail", () => {
    expect(() => parseCompoundKey("1#2#3", ["a", "b"])).toThrowError(
      /Cannot parse compound key/
    )
  })
})
