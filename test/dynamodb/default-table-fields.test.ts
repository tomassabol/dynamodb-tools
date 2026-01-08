import { createDefaultTableFields } from "../../src/dynamodb/default-table-fields"

describe("default-table-fields", () => {
  test("createDefaultTableFields", () => {
    jest.useFakeTimers({ now: 1677532302922 })

    expect(createDefaultTableFields()).toEqual({
      createdAt: "2023-02-27T21:11:42.922Z",
      updatedAt: "2023-02-27T21:11:42.922Z",
    })
  })

  test("createDefaultTableFields with ttl", () => {
    jest.useFakeTimers({ now: 1677532302922 })

    expect(createDefaultTableFields({ ttl: { seconds: 1 } })).toEqual({
      createdAt: "2023-02-27T21:11:42.922Z",
      updatedAt: "2023-02-27T21:11:42.922Z",
      ttl: 1677532303,
    })
  })
})
