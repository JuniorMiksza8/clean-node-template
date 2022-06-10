import { Router } from 'express'
import HealthcheckRoute from './healtcheck.route'
import UserRoute from './user.route'

const routes: Router[] = [HealthcheckRoute, UserRoute]

export default routes
