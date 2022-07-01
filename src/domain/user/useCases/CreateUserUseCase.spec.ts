import { prismaMock } from '../../../infrastructure/database/sql/singleton'
import { CreateUserUseCase } from './CreateUserUseCase'
import { PrismaUserRepository } from '../adapters/PrismaUserRepository'
import { BcryptHashService } from '../../../adapters/BcryptHashService'
import { JoiValidateUser } from '../adapters/JoiValidateUser'
import { CreateUserData } from '../ports/UserRepository'

describe('test create user use case', () => {
  it('should successfully create user', async () => {
    const user: CreateUserData = {
      email: 'teste2@email.com',
      name: 'tester',
      password: 'testpassword',
      salt: '1234',
      status: true,
    }

    prismaMock.user.count.mockResolvedValue(0)

    prismaMock.user.create.mockResolvedValue({
      ...user,
      id: '12312',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const createUserUseCase = new CreateUserUseCase(
      new PrismaUserRepository(),
      new BcryptHashService(),
      new JoiValidateUser()
    )

    const res = await createUserUseCase.handle(user)

    expect(res).toHaveProperty('id', '12312')
  })

  it('should fail creating user with invalid email', async () => {
    const user: CreateUserData = {
      email: 'teste2',
      name: 'tester',
      password: 'testpassword',
      salt: '1234',
      status: true,
    }

    const createUserUseCase = new CreateUserUseCase(
      new PrismaUserRepository(),
      new BcryptHashService(),
      new JoiValidateUser()
    )

    expect(createUserUseCase.handle(user)).rejects.toThrow()
  })
})
