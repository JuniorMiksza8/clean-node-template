import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import { Express } from 'express'

export class SentryPlugin {
  server: Express

  constructor(server: Express) {
    this.server = server
  }

  init(dsn: string) {
    Sentry.init({
      dsn,
      integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({ app: this.server }),
      ],

      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
    })

    // RequestHandler creates a separate execution context using domains, so that every
    // transaction/span/breadcrumb is attached to its own Hub instance
    this.server.use(Sentry.Handlers.requestHandler())

    // TracingHandler creates a trace for every incoming request
    this.server.use(Sentry.Handlers.tracingHandler())

    // The error handler must be before any other error middleware and after all controllers
    this.server.use(Sentry.Handlers.errorHandler())
  }
}
