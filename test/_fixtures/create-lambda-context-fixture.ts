import type { Context } from "aws-lambda"

export function createLambdaContextFixture(): Context {
  return {
    callbackWaitsForEmptyEventLoop: false,
    succeed: jest.fn(),
    fail: jest.fn(),
    done: jest.fn(),
    functionVersion: "$LATEST",
    functionName: "lambda-function",
    memoryLimitInMB: "128",
    logGroupName: "/aws/lambda/lambda-function",
    logStreamName: "mock-log-stream-name",
    clientContext: undefined,
    identity: undefined,
    invokedFunctionArn:
      "arn:aws:lambda:eu-central-1:351520507667:function:lambda-function",
    awsRequestId: "30df9925-9309-48a7-baa2-a1a72512cab7",
    getRemainingTimeInMillis: jest.fn().mockReturnValue(1000),
  }
}
