import { HttpError } from '../../adapters/HttpError'
import { User } from '../../domain/entities/User'
import { HashService } from '../../ports/HashService'
import { UserRepository } from '../../ports/UserRepository'
import { ValidateUser } from '../../ports/ValidateUser'

export class UpdateUserUseCase {
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

  async handle(data: Partial<User>): Promise<Partial<User>> {
    const user = await this.userRepository.findByID(data.id)

    if (!user) throw new HttpError('user not found', 404)

    const toUpdate: Partial<User> = { ...user, ...data }

    if (data.password) {
      const { hash, salt } = await this.hashService.hash(data.password)
      toUpdate.password = hash
      toUpdate.salt = salt
    }

    const isValid = this.validateUser.validate(toUpdate)

    if (!isValid.ok) throw new HttpError(isValid.error, 400)

    return this.userRepository.update({ ...toUpdate, updatedAt: new Date() })
  }
}
