import { User } from '../User'

export class ValidateUser {
  validate: (data: Partial<User>) => { ok: boolean; error: string }
}
