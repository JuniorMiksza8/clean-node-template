import Webserver from '../infrastructure/webserver'
import routes from './config/routes'

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

  start(port: number) {
    this.webserver.start(port)
  }
}
