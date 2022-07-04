import express, { Express, Router } from 'express'
import cors from 'cors'
import chalk from 'chalk'

class Webserver {
  server: Express = express()

  constructor() {
    this.server.use(express.json())
    this.server.use(cors())
  }

  start(port: number) {
    this.server.listen(port, () => {
      console.log(
        chalk.magenta('[server] ') + chalk.green(`up and running on :${port}`)
      )
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addPlugin(plugin: any) {
    this.server.use(plugin)
  }

  register(router: Router) {
    this.server.use('/', router)
  }
}

export default Webserver
