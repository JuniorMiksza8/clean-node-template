import webserver from '../infrastructure/webserver'
import { readdir } from 'fs'
import path from 'path'

export default class Server {
  setupRoutes() {
    readdir(path.join(__dirname, 'routes'), (err, files) => {
      files.forEach(async (file) => {
        const module = await import(
          `./routes/${file.substring(0, file.length - 3)}`
        )
        webserver.register(module.default)
      })
    })
  }

  start() {
    webserver.start()
  }
}
