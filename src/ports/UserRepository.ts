import { User } from '../domain/entities/User'

export interface UserSelect {
  id?: boolean
  name?: boolean
  email?: boolean
  password?: boolean
  salt?: boolean
  status?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}

export class UserRepository {
  findByID: (id: string) => Promise<Partial<User>>
  find: (where?: Partial<User>, select?: UserSelect) => Promise<Partial<User>[]>
  save: (user: User) => Promise<Partial<User>>
  exists: (data: Partial<User>) => Promise<boolean>
}
