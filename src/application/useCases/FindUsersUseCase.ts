import { User } from '../../domain/entities/User'
import { UserRepository } from '../../ports/UserRepository'

export class FindUserUseCase {
  userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async handle(): Promise<Partial<User>[]> {
    const users = await this.userRepository.find({ status: true })

    return users
  }
}
