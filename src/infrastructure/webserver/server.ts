import express, { Express } from 'express'
import { config } from 'dotenv'
import routes from '../../interfaces/routes'
config()

const { HTTP_SERVER_PORT } = process.env

export default class Webserver {
  server: Express

  start() {
    this.server = express()
    this.register()
    this.server.listen(Number(HTTP_SERVER_PORT), () => {
      console.log(`Webserver up and running on ${HTTP_SERVER_PORT}`)
    })
  }

  register() {
    routes.map((router) => {
      this.server.use(router)
    })
  }
}
