import { prismaMock } from '../../../infrastructure/database/sql/singleton'
import { PrismaUserRepository } from '../adapters/PrismaUserRepository'
import { DeleteUserUseCase } from './DeleteUserUseCase'

describe('test delete user use case', () => {
  it('should delete user', async () => {
    prismaMock.user.count.mockResolvedValue(1)

    prismaMock.user.delete.mockResolvedValueOnce({
      id: '12345',
      name: 'teste',
      email: 'teste@teste.com',
      password: '123',
      salt: '123',
      createdAt: new Date(),
      updatedAt: new Date(),
      status: true,
    })

    const deleteUserUseCase = new DeleteUserUseCase(new PrismaUserRepository())

    expect(deleteUserUseCase.handle('12345')).resolves.toBe(true)
  })

  it('should not remove not found user', async () => {
    prismaMock.user.count.mockResolvedValue(0)

    const deleteUserUseCase = new DeleteUserUseCase(new PrismaUserRepository())

    expect(deleteUserUseCase.handle('12345')).rejects.toThrow()
  })
})
