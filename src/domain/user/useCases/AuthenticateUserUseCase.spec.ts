import { prismaMock } from '../../../infrastructure/database/sql/singleton'
import { PrismaUserRepository } from '../adapters/PrismaUserRepository'
import { BcryptHashService } from '../../../adapters/BcryptHashService'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'
import { User } from '../User'
import { JwtService } from '../../../adapters/JwtService'

describe('test authenticate user use case', () => {

    beforeEach(() => {
        process.env.JWT_SECRET = '1234'
        process.env.JWT_ISSUER = 'test'
    })

    it('should authenticate user', async () => {

        const hashService = new BcryptHashService()
        const jwtService = new JwtService()

        const mockPassword = '123'

        const { hash, salt } = await hashService.hash(mockPassword)

        const user: User = {
            email: 'junior.miksza8@gmail.com',
            id: '123',
            name: 'junior',
            password: hash,
            salt: salt,
            status: true,
            updatedAt: new Date(),
            createdAt: new Date(),
        }

        prismaMock.user.findFirst.mockResolvedValueOnce(user)

        const authenticateUserUseCase = new AuthenticateUserUseCase(
            new PrismaUserRepository(),
            hashService,
            jwtService
        )

        const response = await authenticateUserUseCase.handle(user.email, mockPassword)

        const payload = jwtService.verify(response)

        expect(payload.email).toEqual(user.email)
    })
})