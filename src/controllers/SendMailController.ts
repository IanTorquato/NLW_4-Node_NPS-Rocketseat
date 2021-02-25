import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { resolve } from 'path'

import { UsersRepository } from '../repositories/UsersRepository'
import { SurveysRepository } from '../repositories/SurveysRepository'
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'
import SendMailService from '../services/SendMailService'


class SendMailController {
	async send(request: Request, response: Response) {
		const { email, survey_id } = request.body

		const usersRepository = getCustomRepository(UsersRepository)
		const surveysRepository = getCustomRepository(SurveysRepository)
		const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

		const user = await usersRepository.findOne({ email })

		if (!user) {
			return response.status(404).json({ error: 'User does not exists' })
		}

		const survey = await surveysRepository.findOne({ id: survey_id })

		if (!survey) {
			return response.status(404).json({ error: 'Survey does not exists' })
		}

		const surveyUser = surveysUsersRepository.create({ user_id: user.id, survey_id })
		await surveysUsersRepository.save(surveyUser)

		// SendMail
		const link = process.env.URL_MAIL

		const variables = {
			name: user.name, title: survey.title, description: survey.description, link, user_id: user.id
		}

		const path = resolve(__dirname, '..', 'view', 'emails', 'npsMail.hbs')

		const emailOptions = { to: email, subject: survey.title, variables, path }

		await SendMailService.execute(emailOptions)

		return response.status(201).json(surveyUser)
	}
}

export { SendMailController }