import { User } from '@prisma/client'
import { Request, Response } from 'express'
import { CreateUserUseCase } from '../../domain/user/useCases/CreateUserUseCase'
import { DeleteUserUseCase } from '../../domain/user/useCases/DeleteUserUseCase'
import { FindUserUseCase } from '../../domain/user/useCases/FindUsersUseCase'
import { UpdateUserUseCase } from '../../domain/user/useCases/UpdateUserUseCase'

import { HashService } from '../../ports/HashService'
import { UserRepository } from '../../domain/user/ports/UserRepository'
import { ValidateUser } from '../../domain/user/ports/ValidateUser'

export class UserController {
  userRepository: UserRepository
  hashService: HashService
  validateUser: ValidateUser

  constructor(
    userRepository: UserRepository,
    hashService: HashService,
    validateUser: ValidateUser
  ) {
    this.userRepository = userRepository
    this.hashService = hashService
    this.validateUser = validateUser

    this.create = this.create.bind(this)
    this.find = this.find.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async create(req: Request, res: Response) {
    try {
      const data = req.body as User

      const createUserUseCase = new CreateUserUseCase(
        this.userRepository,
        this.hashService,
        this.validateUser
      )

      const user = await createUserUseCase.handle(data)

      return res.status(201).json(user)
    } catch (error) {
      return res.status(error.httpCode || 500).json({ message: error.message })
    }
  }

  async find(req: Request, res: Response) {
    const findUserUseCase = new FindUserUseCase(this.userRepository)

    const users = await findUserUseCase.handle()

    return res.status(200).json(users)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    try {
      const deleteUserUseCase = new DeleteUserUseCase(this.userRepository)

      await deleteUserUseCase.handle(id)

      return res.status(200).send()
    } catch (error) {
      return res.status(error.httpCode || 500).json({ message: error.message })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const data = req.body as User

      const updateUserUseCase = new UpdateUserUseCase(
        this.userRepository,
        this.hashService,
        this.validateUser
      )

      const user = await updateUserUseCase.handle(data)

      return res.status(200).json(user)
    } catch (error) {
      return res.status(error.httpCode || 500).json({ message: error.message })
    }
  }
}
