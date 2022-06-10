import { HttpError } from '../../adapters/HttpError'
import { User } from '../../domain/entities/User'
import { HashService } from '../../ports/HashService'
import { UserRepository } from '../../ports/UserRepository'

export class CreateUserUseCase {
  userRepository: UserRepository
  hashService: HashService

  constructor(userRepository: UserRepository, hashService: HashService) {
    this.userRepository = userRepository
    this.hashService = hashService
  }

  async handle(data: User): Promise<Partial<User> | HttpError> {
    const { password, email } = data

    const emailExists = await this.userRepository.exists({ email })

    if (emailExists) throw new HttpError('email already used', 400)

    const { hash, salt } = await this.hashService.hash(password)

    const user = await this.userRepository.save({
      ...data,
      password: hash,
      salt,
    })

    return user
  }
}
