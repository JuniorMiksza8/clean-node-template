import { Request, Response } from 'express'

export default class HealthCheckController {
  check(req: Request, res: Response) {
    return res.status(200).send()
  }
}
