import Joi from 'joi'
import { User } from '../../domain/entities/User'
import { ValidateUser } from '../../ports/ValidateUser'

const UserSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  salt: Joi.string(),
  status: Joi.boolean(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
})

export class JoiValidateUser implements ValidateUser {
  validate(data: User) {
    const res = UserSchema.validate(data)

    return {
      ok: !res.error,
      error: res.error?.message,
    }
  }
}
