/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Logger interface
 */

export interface ILogger {
  debug(message?: any, ...optionalParams: any[]): void
  info(message?: any, ...optionalParams: any[]): void
  error(message?: any, ...optionalParams: any[]): void
  warn(message?: any, ...optionalParams: any[]): void
}
