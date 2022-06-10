import { Request, Response } from 'express'
import { BcryptHashService } from '../../adapters/BcryptHashService'
import { HttpError } from '../../adapters/HttpError'
import { CreateUserUseCase } from '../../application/useCases/CreateUserUseCase'
import { FindUserUseCase } from '../../application/useCases/findUsersUseCase'
import { User } from '../../domain/entities/User'
import { PrismaUserRepository } from '../../infrastructure/repositories/postgres/PrismaUserRepository'

export async function CreateUserController(req: Request, res: Response) {
  try {
    const data = req.body as User

    const createUserUseCase = new CreateUserUseCase(
      new PrismaUserRepository(),
      new BcryptHashService()
    )

    const user = await createUserUseCase.handle(data)

    return res.status(200).json(user)
  } catch (error) {
    if (error.httpCode) {
      res.status(error.httpCode).json({ message: error.message })
    } else res.status(500).json({ message: error.message })
  }
}

export async function FindUserController(req: Request, res: Response) {
  const findUserUseCase = new FindUserUseCase(new PrismaUserRepository())

  const users = await findUserUseCase.handle()

  return res.status(200).json(users)
}
