import type { DynamoDBStreamEvent } from "aws-lambda"
import { createDynamoDbStreamHandler } from "../../src/streams/stream-handler"
import { createLambdaContextFixture } from "../_fixtures/create-lambda-context-fixture"

describe("stream-handler", () => {
  test("success", async () => {
    const onInsert = jest.fn()
    const onModify = jest.fn()
    const onRemove = jest.fn()
    const onError = jest.fn()
    const handler = createDynamoDbStreamHandler({
      onInsert,
      onModify,
      onRemove,
      onError,
    })

    await expect(handler(eventFixture, contextFixture)).resolves.toBeUndefined()

    expect(onInsert).toHaveBeenCalledTimes(2)
    expect(onInsert.mock.calls).toMatchSnapshot()

    expect(onModify).toHaveBeenCalledTimes(1)
    expect(onModify.mock.calls).toMatchSnapshot()

    expect(onRemove).toHaveBeenCalledTimes(1)
    expect(onRemove.mock.calls).toMatchSnapshot()

    expect(onError).not.toHaveBeenCalled()
  })

  test("error", async () => {
    const onInsert = jest
      .fn()
      .mockRejectedValueOnce(new Error("Failure injection"))
    const onModify = jest.fn()
    const onRemove = jest.fn()
    const handler = createDynamoDbStreamHandler({
      onInsert,
      onModify,
      onRemove,
    })

    await expect(handler(eventFixture, contextFixture)).rejects.toThrow(
      "Failure injection"
    )
  })

  test("error with onError handler", async () => {
    const onInsert = jest
      .fn()
      .mockRejectedValueOnce(new Error("Failure injection"))
    const onModify = jest.fn()
    const onRemove = jest.fn()
    const onError = jest.fn()
    const handler = createDynamoDbStreamHandler({
      onInsert,
      onModify,
      onRemove,
      onError,
      consumeHandledExceptions: true,
    })

    await expect(handler(eventFixture, contextFixture)).resolves.toBeUndefined()

    expect(onInsert).toHaveBeenCalledTimes(2)

    expect(onModify).toHaveBeenCalledTimes(1)

    expect(onRemove).toHaveBeenCalledTimes(1)

    expect(onError).toHaveBeenCalledTimes(1)
    expect(onError.mock.calls).toMatchSnapshot()
  })

  test("invalid event", async () => {
    const onInsert = jest.fn()
    const onModify = jest.fn()
    const onRemove = jest.fn()
    const handler = createDynamoDbStreamHandler({
      onInsert,
      onModify,
      onRemove,
    })

    await expect(handler(invalidEventFixture, contextFixture)).rejects.toThrow(
      "Event INVALID not expected"
    )
  })

  test("invalid event with onError handler", async () => {
    const onInsert = jest.fn()
    const onModify = jest.fn()
    const onRemove = jest.fn()
    const onError = jest.fn()
    const handler = createDynamoDbStreamHandler({
      onInsert,
      onModify,
      onRemove,
      onError,
      consumeHandledExceptions: true,
    })

    await expect(
      handler(invalidEventFixture, contextFixture)
    ).resolves.toBeUndefined()

    expect(onError).toHaveBeenCalledTimes(1)
    expect(onError.mock.calls).toMatchSnapshot()
  })

  test("invalid event", async () => {
    const onInsert = jest.fn()
    const onModify = jest.fn()
    const onRemove = jest.fn()
    const handler = createDynamoDbStreamHandler({
      onInsert,
      onModify,
      onRemove,
    })

    await expect(handler(invalidEventFixture, contextFixture)).rejects.toThrow(
      "Event INVALID not expected"
    )
  })
})

const eventFixture = {
  Records: [
    {
      eventID: "56f0ecac7267fb3ec2b6190929519e52",
      eventName: "INSERT",
      eventVersion: "1.1",
      eventSource: "aws:dynamodb",
      awsRegion: "eu-central-1",
      dynamodb: {
        ApproximateCreationDateTime: 1675243406,
        Keys: {
          sk: {
            S: "76236873-f38f-4512-9657-6375d276bb83",
          },
          pk: {
            S: "c56bd695-c37c-4368-af66-1445ddbf17a8",
          },
        },
        NewImage: {
          sk: {
            S: "76236873-f38f-4512-9657-6375d276bb83",
          },
          pk: {
            S: "c56bd695-c37c-4368-af66-1445ddbf17a8",
          },
        },
        SequenceNumber: "4898900000000061634845079",
        SizeBytes: 152,
        StreamViewType: "NEW_AND_OLD_IMAGES",
      },
      eventSourceARN:
        "arn:aws:dynamodb:eu-central-1:055951622116:table/cdk-dynamodb-app-v1-rs-TestTable7E8F86C8-HQ7ZWDOVI9HY/stream/2023-01-31T13:55:10.906",
    },
    {
      eventID: "3190321c1e680508ac8918779af4e74e",
      eventName: "INSERT",
      eventVersion: "1.1",
      eventSource: "aws:dynamodb",
      awsRegion: "eu-central-1",
      dynamodb: {
        ApproximateCreationDateTime: 1675243406,
        Keys: {
          sk: {
            S: "9fc4e6c8-a731-4291-a620-26f6063c550b",
          },
          pk: {
            S: "ac862be8-e3cd-49ff-8c0e-6c1ee5452ec2",
          },
        },
        NewImage: {
          sk: {
            S: "9fc4e6c8-a731-4291-a620-26f6063c550b",
          },
          pk: {
            S: "ac862be8-e3cd-49ff-8c0e-6c1ee5452ec2",
          },
        },
        SequenceNumber: "4899000000000061634845080",
        SizeBytes: 152,
        StreamViewType: "NEW_AND_OLD_IMAGES",
      },
      eventSourceARN:
        "arn:aws:dynamodb:eu-central-1:055951622116:table/cdk-dynamodb-app-v1-rs-TestTable7E8F86C8-HQ7ZWDOVI9HY/stream/2023-01-31T13:55:10.906",
    },
    {
      eventID: "3190321c1e680508ac8918779af4e74e",
      eventName: "MODIFY",
      eventVersion: "1.1",
      eventSource: "aws:dynamodb",
      awsRegion: "eu-central-1",
      dynamodb: {
        ApproximateCreationDateTime: 1675243406,
        Keys: {
          sk: {
            S: "9fc4e6c8-a731-4291-a620-26f6063c550b",
          },
          pk: {
            S: "ac862be8-e3cd-49ff-8c0e-6c1ee5452ec2",
          },
        },
        OldImage: {
          sk: {
            S: "db387244-5f4f-4189-a18a-f5a935c2618b",
          },
          pk: {
            S: "fffc8917-36b2-40e0-ae2a-132e1891d8a4",
          },
        },
        NewImage: {
          sk: {
            S: "9fc4e6c8-a731-4291-a620-26f6063c550b",
          },
          pk: {
            S: "ac862be8-e3cd-49ff-8c0e-6c1ee5452ec2",
          },
        },
        SequenceNumber: "4899000000000061634845080",
        SizeBytes: 152,
        StreamViewType: "NEW_AND_OLD_IMAGES",
      },
      eventSourceARN:
        "arn:aws:dynamodb:eu-central-1:055951622116:table/cdk-dynamodb-app-v1-rs-TestTable7E8F86C8-HQ7ZWDOVI9HY/stream/2023-01-31T13:55:10.906",
    },
    {
      eventID: "3190321c1e680508ac8918779af4e74e",
      eventName: "REMOVE",
      eventVersion: "1.1",
      eventSource: "aws:dynamodb",
      awsRegion: "eu-central-1",
      dynamodb: {
        ApproximateCreationDateTime: 1675243406,
        Keys: {
          sk: {
            S: "6ec3ca0a-e2ed-4552-927d-63f7ed4178ed",
          },
          pk: {
            S: "9ebcd559-b967-4dfc-8a79-f914441de152",
          },
        },
        OldImage: {
          sk: {
            S: "6ec3ca0a-e2ed-4552-927d-63f7ed4178ed",
          },
          pk: {
            S: "9ebcd559-b967-4dfc-8a79-f914441de152",
          },
        },
        SequenceNumber: "4899000000000061634845080",
        SizeBytes: 152,
        StreamViewType: "NEW_AND_OLD_IMAGES",
      },
      eventSourceARN:
        "arn:aws:dynamodb:eu-central-1:055951622116:table/cdk-dynamodb-app-v1-rs-TestTable7E8F86C8-HQ7ZWDOVI9HY/stream/2023-01-31T13:55:10.906",
    },
  ],
} satisfies DynamoDBStreamEvent

const invalidEventFixture = {
  Records: [
    {
      eventID: "56f0ecac7267fb3ec2b6190929519e52",
      eventName: "INVALID",
      eventVersion: "1.1",
      eventSource: "aws:dynamodb",
      awsRegion: "eu-central-1",
      dynamodb: {
        ApproximateCreationDateTime: 1675243406,
        Keys: {
          sk: {
            S: "76236873-f38f-4512-9657-6375d276bb83",
          },
          pk: {
            S: "c56bd695-c37c-4368-af66-1445ddbf17a8",
          },
        },
        NewImage: {
          sk: {
            S: "76236873-f38f-4512-9657-6375d276bb83",
          },
          pk: {
            S: "c56bd695-c37c-4368-af66-1445ddbf17a8",
          },
        },
        SequenceNumber: "4898900000000061634845079",
        SizeBytes: 152,
        StreamViewType: "NEW_AND_OLD_IMAGES",
      },
      eventSourceARN:
        "arn:aws:dynamodb:eu-central-1:055951622116:table/cdk-dynamodb-app-v1-rs-TestTable7E8F86C8-HQ7ZWDOVI9HY/stream/2023-01-31T13:55:10.906",
    },
  ],
} as unknown as DynamoDBStreamEvent

const contextFixture = createLambdaContextFixture()
