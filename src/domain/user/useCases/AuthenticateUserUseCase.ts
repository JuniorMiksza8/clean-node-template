import { HttpError } from '../../../adapters/HttpError'
import { HashService } from '../../../ports/HashService'
import { JwtService } from '../../../ports/JwtService'
import { UserRepository } from '../ports/UserRepository'

export class AuthenticateUserUseCase {

    constructor(
        private userRepository: UserRepository,
        private hashService: HashService,
        private jwtService: JwtService
    ) { }

    async handle(email: string, password: string) {
        const user = await this.userRepository.findOne({ email })

        if (!user) throw new HttpError('user not found', 404)

        const isEquals = await this.hashService.compare(user.password, password)

        if (!isEquals) throw new HttpError('invalid credentials', 401)

        const token = await this.jwtService.sign({
            id: user.id,
            email: user.email,
            name: user.name
        })

        return token
    }
}