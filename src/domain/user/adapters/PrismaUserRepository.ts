import { User } from '../User'
import {
  UserSelect,
  UserRepository,
  CreateUserData,
} from '../ports/UserRepository'

import connection from '../../../infrastructure/database/sql/connection'

const defaultSelect: UserSelect = {
  createdAt: true,
  updatedAt: true,
  email: true,
  id: true,
  name: true,
  status: true,
  password: false,
  salt: false,
}

export class PrismaUserRepository implements UserRepository {
  findByID(id: string): Promise<Partial<User> | null> {
    return connection.user.findUnique({ where: { id } })
  }

  find(where?: Partial<User>, select?: UserSelect): Promise<Partial<User>[]> {
    return connection.user.findMany({
      where,
      select: { ...defaultSelect, ...select },
    })
  }

  save(data: CreateUserData): Promise<Partial<User>> {
    return connection.user.create({ data, select: defaultSelect })
  }

  async exists(data: Partial<User>) {
    const res = await connection.user.count({ where: { ...data } })

    return res > 0
  }

  async deleteByID(id: string) {
    const res = await connection.user.delete({ where: { id } })
    return !!res
  }

  async update(data: Partial<User>): Promise<Partial<User>> {
    const { id, ...rest } = data
    return connection.user.update({
      where: { id },
      data: rest,
      select: defaultSelect,
    })
  }
}
