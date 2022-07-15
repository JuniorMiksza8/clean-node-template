import { BcryptHashService } from './BcryptHashService'

describe('should test bcrypt hash service', () => {
  it('should hash a payload', async () => {
    const payload = 'mypass'

    const bcryptHashService = new BcryptHashService()

    const response = await bcryptHashService.hash(payload)

    expect(response).toHaveProperty('hash')
    expect(response).toHaveProperty('salt')
  })
})
