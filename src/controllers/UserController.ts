import { Request, Response } from 'express'

class UserController {
	async index(request: Request, response: Response) {
		response.json({ message: 'Hello Silbeck' })
	}
}

export { UserController }