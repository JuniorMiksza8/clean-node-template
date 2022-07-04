import { prismaMock } from '../../../infrastructure/database/sql/singleton'
import { PrismaUserRepository } from '../adapters/PrismaUserRepository'
import { User } from '../User'
import { FindUserUseCase } from './FindUsersUseCase'

describe('it should find users use case', () => {
  it('should return users', async () => {
    const data: User[] = [
      {
        id: '123',
        name: 'teste1',
        email: 'teste1@gmail.com',
        password: '123',
        salt: '123',
        status: true,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    ]

    prismaMock.user.findMany.mockResolvedValueOnce(data)

    const findUsersUseCase = new FindUserUseCase(new PrismaUserRepository())

    expect(findUsersUseCase.handle()).resolves.toBe(data)
  })
})
