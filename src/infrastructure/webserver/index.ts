import express, { Express, Router } from 'express'

class Webserver {
  server: Express

  start(port: number) {
    this.server = express()
    this.server.listen(port, () => {
      console.log(`Webserver up and running on ${port}`)
    })
  }

  register(router: Router) {
    this.server.use('/', router)
  }
}

export default Webserver
