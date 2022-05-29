import Webserver from '../infrastructure/webserver'
import routes from './routes'
import { config } from 'dotenv'

config()

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

  start() {
    const { HTTP_SERVER_PORT } = process.env
    this.webserver.start(Number(HTTP_SERVER_PORT || 3000))
  }
}
