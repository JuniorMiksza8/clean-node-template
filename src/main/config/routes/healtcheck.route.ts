import { Router } from 'express'
import HealthCheckController from '../../../interfaces/controllers/HealthCheckController'

const router = Router()

const healthcheckController = new HealthCheckController()

router.get('/', healthcheckController.check)

export default router
