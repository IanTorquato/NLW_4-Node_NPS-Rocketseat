import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { SurveysRepository } from '../repositories/SurveysRepository'

import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'
import { UsersRepository } from '../repositories/UsersRepository'


class SendMailController {
	async send(request: Request, response: Response) {
		const { email, survey_id } = request.body

		return response.status(201).json({ email, survey_id })
	}

	// async index(request: Request, response: Response) {
	// 	const surveysRepository = getCustomRepository(SurveysRepository)

	// 	const allSurveys = await surveysRepository.find()

	// 	return response.json(allSurveys)
	// }
}

export { SendMailController }