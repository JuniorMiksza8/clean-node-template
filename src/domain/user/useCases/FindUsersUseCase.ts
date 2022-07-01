import { UserRepository } from '../ports/UserRepository'
import { User } from '../User'

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
