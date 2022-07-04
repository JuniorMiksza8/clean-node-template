import { prismaMock } from '../../../infrastructure/database/sql/singleton'
import { UpdateUserUseCase } from './UpdateUserUseCase'
import { PrismaUserRepository } from '../adapters/PrismaUserRepository'
import { BcryptHashService } from '../../../adapters/BcryptHashService'
import { JoiValidateUserDTO } from '../adapters/JoiValidateUserDTO'

describe('test update user use case', () => {
  it('should successfully update a user', async () => {
    const data = {
      id: '12312',
      name: 'tester02',
      email: 'tester0202@gmail.com',
      password: '1231',
      salt: '2183128',
    }

    prismaMock.user.update.mockResolvedValueOnce({
      createdAt: new Date(),
      updatedAt: new Date(),
      status: true,
      ...data,
    })

    prismaMock.user.findUnique.mockResolvedValueOnce({
      createdAt: new Date(),
      updatedAt: new Date(),
      status: true,
      ...data,
    })

    const updateUserUseCase = new UpdateUserUseCase(
      new PrismaUserRepository(),
      new BcryptHashService(),
      new JoiValidateUserDTO()
    )

    const res = await updateUserUseCase.handle(data)

    expect(res).toHaveProperty('id', '12312')
  })

  it('should not update invalid user', async () => {
    const data = {
      name: 'tester02',
      email: 'tester0202',
      password: '1231',
    }

    const updateUserUseCase = new UpdateUserUseCase(
      new PrismaUserRepository(),
      new BcryptHashService(),
      new JoiValidateUserDTO()
    )

    expect(updateUserUseCase.handle(data)).rejects.toThrow()
  })
})
