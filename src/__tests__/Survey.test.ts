import request from 'supertest'

import { app } from '../app'
import createConnection from '../database'

describe('Surveys', () => {
	beforeAll(async () => {
		const connection = await createConnection()

		await connection.runMigrations()
	})

	it('should be able to create a new survey', async () => {
		const response = await request(app).post('/surveys').send({
			title: 'Test Title', description: 'Test description'
		})

		expect(response.status).toBe(201)
		expect(response.body).toHaveProperty('id')
	})
})