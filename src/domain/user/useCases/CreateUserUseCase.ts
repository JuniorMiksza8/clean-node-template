import { HttpError } from '../../../adapters/HttpError'
import { HashService } from '../../../ports/HashService'
import { CreateUserData, UserRepository } from '../ports/UserRepository'
import { ValidateUser } from '../ports/ValidateUser'
import { User } from '../User'

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

  async handle(data: CreateUserData): Promise<Partial<User> | HttpError> {
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
