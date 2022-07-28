import { User } from '../User'

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

export interface CreateUserData {
  name: string
  email: string
  password: string
  salt: string
  status: boolean
}

export class UserRepository {
  findByID: (id: string) => Promise<Partial<User> | null>
  findOne: (where?: Partial<User>, select?: UserSelect) => Promise<User | null>
  find: (where?: Partial<User>, select?: UserSelect) => Promise<Partial<User>[]>
  save: (user: CreateUserData) => Promise<Partial<User>>
  exists: (data: Partial<User>) => Promise<boolean>
  deleteByID: (id: string) => Promise<boolean>
  update: (data: Partial<User>) => Promise<Partial<User>>
}
