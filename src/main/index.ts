import Webserver from '../infrastructure/webserver'
import { SentryPlugin } from '../infrastructure/webserver/plugins/SentryPlugin'
import routes from './config/routes'

export class Application {
  constructor() {
    const { PORT, SENTRY_DSN = '' } = process.env

    const server = new Webserver()

    const sentryPlugin = new SentryPlugin(server.server)

    routes.map((route) => server.register(route))

    sentryPlugin.init(SENTRY_DSN)

    server.start(Number(PORT))
  }
}
