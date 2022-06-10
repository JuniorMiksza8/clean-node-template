import { Router } from 'express'

import {
  CreateUserController,
  FindUserController,
} from '../../interfaces/controllers/user.controller'

const router = Router()

router.get('/user', FindUserController)

router.post('/user', CreateUserController)

export default router
