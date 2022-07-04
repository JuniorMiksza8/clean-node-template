import { Router } from 'express'
import { BcryptHashService } from '../../../adapters/BcryptHashService'
import { JoiValidateUserDTO } from '../../../domain/user/adapters/JoiValidateUserDTO'
import { PrismaUserRepository } from '../../../domain/user/adapters/PrismaUserRepository'

import { UserController } from '../../../interfaces/controllers/UserController'

const router = Router()

const userController = new UserController(
  new PrismaUserRepository(),
  new BcryptHashService(),
  new JoiValidateUserDTO()
)

router.get('/user', userController.find)

router.post('/user', userController.create)

router.delete('/user/:id', userController.delete)

router.put('/user', userController.update)

export default router
