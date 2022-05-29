import Webserver from '../infrastructure/webserver'
import { readdir } from 'fs'
import path from 'path'

import { config } from 'dotenv'

config()

export default class Server {
  webserver: Webserver

  constructor(webserver: Webserver = new Webserver()) {
    this.webserver = webserver
  }

  setupRoutes() {
    readdir(path.join(__dirname, 'routes'), (err, files) => {
      files.forEach(async (file) => {
        const module = await import(
          `./routes/${file.substring(0, file.length - 3)}`
        )
        this.webserver.register(module.default)
      })
    })
  }

  start() {
    const { HTTP_SERVER_PORT } = process.env
    this.webserver.start(Number(HTTP_SERVER_PORT || 3000))
  }
}
