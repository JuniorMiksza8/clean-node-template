import { Response, Router } from 'express'
const router = Router()

router.get('/', (req, res: Response) => {
  res.status(200).send()
})

export default router
