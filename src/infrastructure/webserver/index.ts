import express, { Express, Router } from 'express'
import cors from 'cors'
import chalk from 'chalk'

class Webserver {
  server: Express = express()

  start(port: number) {
    this.server.use(express.json())
    this.server.use(cors())
    this.server.listen(port, () => {
      console.log(
        chalk.magenta('[server] ') + chalk.green(`up and running on :${port}`)
      )
    })
  }

  register(router: Router) {
    this.server.use('/', router)
  }
}

export default Webserver
