import { User } from '../domain/entities/User'

export class ValidateUser {
  validate: (data: Partial<User>) => { ok: boolean; error: string }
}
