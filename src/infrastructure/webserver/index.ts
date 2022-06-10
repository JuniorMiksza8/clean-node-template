import express, { Express, Router } from 'express'
import cors from 'cors'

class Webserver {
  server: Express = express()

  start(port: number) {
    this.server.use(express.json())
    this.server.use(cors())
    this.server.listen(port, () => {
      console.log(`Webserver up and running on ${port}`)
    })
  }

  register(router: Router) {
    this.server.use('/', router)
  }
}

export default Webserver
