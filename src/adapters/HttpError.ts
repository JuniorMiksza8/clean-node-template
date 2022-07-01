import { captureMessage, withScope } from '@sentry/node'

export class HttpError extends Error {
  httpCode: number

  constructor(message: string, httpCode: number) {
    super(message)
    this.httpCode = httpCode

    withScope((scope) => {
      scope.setTag('status', httpCode)
      captureMessage(message)
    })
  }
}
