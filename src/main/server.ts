import Webserver from '../infrastructure/webserver'
import routes from './config/routes'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'

export default class Server {
  webserver: Webserver

  constructor(webserver: Webserver = new Webserver()) {
    this.webserver = webserver
  }

  setupRoutes() {
    routes.map((value) => {
      this.webserver.register(value)
    })
  }

  setupSentry(dsn: string) {
    Sentry.init({
      dsn,
      integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({ app: this.webserver.server }),
      ],

      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
    })

    // RequestHandler creates a separate execution context using domains, so that every
    // transaction/span/breadcrumb is attached to its own Hub instance
    this.webserver.server.use(Sentry.Handlers.requestHandler())

    // TracingHandler creates a trace for every incoming request
    this.webserver.server.use(Sentry.Handlers.tracingHandler())

    // The error handler must be before any other error middleware and after all controllers
    this.webserver.server.use(Sentry.Handlers.errorHandler())
  }

  start(port: number) {
    this.webserver.start(port)
  }
}
