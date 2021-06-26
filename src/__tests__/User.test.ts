import request from 'supertest'
import { getConnection } from 'typeorm'

import { app } from '../app'
import createConnection from '../database'

describe('Users', () => {
  beforeAll(async () => {
    const connection = await createConnection()

    await connection.runMigrations()
  })

  afterAll(async () => {
    const connection = getConnection()

    await connection.dropDatabase()
    await connection.close()
  })

  it('should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'Test Name', email: 'test@test.com'
    })

    expect(response.status).toBe(201)
  })

  it('should not be able to create a new user with exists email', async () => {
    const response = await request(app).post('/users').send({
      name: 'Test Jest', email: 'test@test.com'
    })

    expect(response.status).toBe(400)
  })
})
