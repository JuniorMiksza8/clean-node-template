import { HttpError } from '../../adapters/HttpError'
import { User } from '../../domain/entities/User'
import { HashService } from '../../ports/HashService'
import { UserRepository } from '../../ports/UserRepository'
import { ValidateUser } from '../../ports/ValidateUser'

export class CreateUserUseCase {
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
  }

  async handle(data: User): Promise<Partial<User> | HttpError> {
    const isValid = this.validateUser.validate(data)

    if (!isValid.ok) throw new HttpError(isValid.error, 400)

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
