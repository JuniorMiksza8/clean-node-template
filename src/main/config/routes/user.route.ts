import { Router } from 'express'
import { BcryptHashService } from '../../../adapters/BcryptHashService'
import { JoiValidateUser } from '../../../adapters/validators/JoiValidateUser'
import { PrismaUserRepository } from '../../../infrastructure/repositories/postgres/PrismaUserRepository'

import { UserController } from '../../../interfaces/controllers/UserController'

const router = Router()

const userController = new UserController(
  new PrismaUserRepository(),
  new BcryptHashService(),
  new JoiValidateUser()
)

router.get('/user', userController.find)

router.post('/user', userController.create)

router.delete('/user/:id', userController.delete)

router.put('/user', userController.update)

export default router
