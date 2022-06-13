import { HttpError } from '../../adapters/HttpError'
import { UserRepository } from '../../ports/UserRepository'

export class DeleteUserUseCase {
  userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async handle(id: string): Promise<boolean> {
    const exists = await this.userRepository.exists({ id })

    if (!exists) throw new HttpError('user not found', 404)

    const deleted = await this.userRepository.deleteByID(id)

    return deleted
  }
}
