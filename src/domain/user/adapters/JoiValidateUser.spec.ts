import { JoiValidateUserDTO } from './JoiValidateUserDTO'

describe('test validate user function', () => {
  it('should validate valid user', () => {
    const joiValidateUserDTO = new JoiValidateUserDTO()

    const user = {
      name: 'tester',
      email: 'tester@gmail.com',
      password: '12312',
    }

    expect(joiValidateUserDTO.validate(user)).toHaveProperty('ok', true)
  })
})
