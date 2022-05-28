import express, { Express, Router } from 'express'
import { config } from 'dotenv'

config()

const { HTTP_SERVER_PORT } = process.env

class Webserver {
  server: Express

  start() {
    this.server = express()
    this.server.listen(Number(HTTP_SERVER_PORT), () => {
      console.log(`Webserver up and running on ${HTTP_SERVER_PORT}`)
    })
  }

  register(router: Router) {
    this.server.use(router)
  }
}

export default new Webserver()
