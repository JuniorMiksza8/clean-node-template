import Webserver from '../../../infrastructure/webserver'
import { prismaMock } from '../../../infrastructure/database/sql/singleton'
import UserRoute from '../routes/user.route'
import request from 'supertest'
import { User } from '../../../domain/user/User'

describe('test user controller', () => {
  const app = new Webserver()
  app.register(UserRoute)

  it('should create a user', async () => {
    const data = {
      email: 'teste2@email.com',
      name: 'tester',
      password: 'testpassword',
    }

    prismaMock.user.count.mockResolvedValue(0)

    prismaMock.user.create.mockResolvedValue({
      ...data,
      status: true,
      salt: '123',
      id: '12312',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const res = await request(app.server).post('/user').send(data)

    expect(res.body.id).toBe('12312')
    expect(res.status).toBe(201)
  })

  it('should not create invalid user', async () => {
    const data = {
      email: 'teste2',
      name: 'tester',
    }

    const res = await request(app.server).post('/user').send(data)

    expect(res.body.message).toBeDefined()
    expect(res.status).toBe(400)
  })

  it('should update user', async () => {
    const data = {
      id: '123123',
      email: 'teste2@email.com',
      name: 'tester',
      password: 'testpassword',
    }

    prismaMock.user.findUnique.mockResolvedValue({
      ...data,
      status: true,
      salt: '123',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    prismaMock.user.update.mockResolvedValue({
      ...data,
      status: true,
      salt: '123',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const res = await request(app.server).put('/user').send(data)

    expect(res.body.id).toBe(data.id)
    expect(res.status).toBe(200)
  })

  it('should not update not found user', async () => {
    const data = {
      id: '123123',
      email: 'teste2',
      name: 'tester',
      password: 'testpassword',
    }

    prismaMock.user.findUnique.mockResolvedValue(null)

    const res = await request(app.server).put('/user').send(data)

    expect(res.body.message).toBeDefined()
    expect(res.status).toBe(404)
  })

  it('should not update invalid user', async () => {
    const data = {
      id: '123123',
      email: 'teste2',
      name: 'tester',
      password: 'testpassword',
    }

    prismaMock.user.findUnique.mockResolvedValue({
      ...data,
      status: true,
      salt: '123',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const res = await request(app.server).put('/user').send(data)

    expect(res.body.message).toBeDefined()
    expect(res.status).toBe(400)
  })

  it('should delelete user', async () => {
    const data = {
      id: '123123',
      email: 'teste2',
      name: 'tester',
      password: 'testpassword',
    }

    prismaMock.user.count.mockResolvedValue(1)

    prismaMock.user.delete.mockResolvedValue({
      ...data,
      status: true,
      salt: '123',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const res = await request(app.server).delete(`/user/${data.id}`).send(data)

    expect(res.status).toBe(200)
  })

  it('should not delelete user', async () => {
    const data = {
      id: '123123',
      email: 'teste2',
      name: 'tester',
      password: 'testpassword',
    }

    prismaMock.user.count.mockResolvedValue(0)

    const res = await request(app.server).delete(`/user/${data.id}`).send(data)

    expect(res.status).toBe(404)
  })

  it('should retrieve users', async () => {
    const data: User[] = [
      {
        email: 'teste2@email.com',
        name: 'tester',
        password: 'testpassword',
        salt: '123',
        createdAt: new Date(),
        updatedAt: new Date(),
        id: '123',
        status: true,
      },
    ]

    prismaMock.user.findMany.mockResolvedValue(data)

    const res = await request(app.server).get('/user')

    expect(res.body.length).toBe(1)
    expect(res.status).toBe(200)
  })
})
