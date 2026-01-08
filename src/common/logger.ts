/**
 * Empty logger used to disable logging for unit tests.
 */

import { ILogger } from "./logger-interface"

const noLogger = {
  log: () => undefined,
  debug: () => undefined,
  info: () => undefined,
  error: () => undefined,
  warn: () => undefined,
}

/**
 * CloudWatch logger.
 */

export const logger: ILogger =
  process.env.JEST_WORKER_ID === undefined || process.env.TEST_LOGGER
    ? console
    : noLogger
