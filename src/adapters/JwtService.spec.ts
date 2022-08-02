import { JwtService } from './JwtService'

describe('jwt service test', () => {

    beforeEach(() => {
        process.env.JWT_SECRET = '1234'
        process.env.JWT_ISSUER = 'test'
    })

    it('should sign a jwt', () => {
        const jwtService = new JwtService()

        const response = jwtService.sign({ data: 'test' }, 60 * 60 * 24)

        expect(response).toBeTruthy()

    })

    it('should verify a jwt', () => {
        const jwtService = new JwtService()

        const signed = jwtService.sign({ data: 'test' }, 60 * 60 * 24)
        const verified = jwtService.verify(signed)

        expect(verified).toHaveProperty('data')

    })
})