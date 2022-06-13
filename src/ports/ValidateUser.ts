import { User } from '../domain/user/User'

export class ValidateUser {
  validate: (data: Partial<User>) => { ok: boolean; error: string }
}
