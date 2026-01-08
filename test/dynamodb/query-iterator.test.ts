import { concatQueryResults } from "../../src/dynamodb/query-iterator"
import { QueryCommandBuilder } from "../../src/dynamodb/query-command-builder"
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb"

describe("query-iterator", () => {
  test("concatQueryResults", async () => {
    const mockDynamoDBDocumentClient = { send: jest.fn() }

    mockDynamoDBDocumentClient.send.mockResolvedValueOnce({
      Items: [1, 2, 3],
      LastEvaluatedKey: { key: "1" },
    })
    mockDynamoDBDocumentClient.send.mockResolvedValueOnce({
      Items: [4, 5],
      LastEvaluatedKey: { key: "2" },
    })
    mockDynamoDBDocumentClient.send.mockResolvedValueOnce({
      Items: [6],
    })

    const builder = new QueryCommandBuilder("table")
    const input = builder.partitionKeyEquals("pk", "key").buildCommandInput()
    await expect(
      concatQueryResults(
        mockDynamoDBDocumentClient as unknown as DynamoDBDocumentClient,
        input
      )
    ).resolves.toEqual([1, 2, 3, 4, 5, 6])

    expect(mockDynamoDBDocumentClient.send.mock.calls).toMatchSnapshot()
  })

  test("concatQueryResults with start key", async () => {
    const mockDynamoDBDocumentClient = { send: jest.fn() }

    mockDynamoDBDocumentClient.send.mockResolvedValueOnce({
      Items: [1, 2, 3],
      LastEvaluatedKey: { key: "1" },
    })
    mockDynamoDBDocumentClient.send.mockResolvedValueOnce({
      Items: [4, 5],
      LastEvaluatedKey: { key: "2" },
    })
    mockDynamoDBDocumentClient.send.mockResolvedValueOnce({
      Items: [6],
    })

    const builder = new QueryCommandBuilder("table")
    const input = builder.partitionKeyEquals("pk", "key").buildCommandInput()
    await expect(
      concatQueryResults(
        mockDynamoDBDocumentClient as unknown as DynamoDBDocumentClient,
        input,
        { startKey: { key: "start-key" } }
      )
    ).resolves.toEqual([1, 2, 3, 4, 5, 6])

    expect(mockDynamoDBDocumentClient.send.mock.calls).toMatchSnapshot()
  })
})
