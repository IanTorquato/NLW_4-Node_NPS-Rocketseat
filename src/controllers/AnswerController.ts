import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'
import { AppError } from '../errors/AppError'


// https://localhost:333/answers/:value?u=d0cd2dec-8c76-44c0-8c1c-9bfdd5f3592d
class AnswerController {
  async execute(request: Request, response: Response) {
    const { value } = request.params
    const { u } = request.query

    console.log(value, u)

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

    const surveyUser = await surveysUsersRepository.findOne({ id: String(u) })

    console.log(surveyUser)

    if (!surveyUser) {
      throw new AppError('Survey User does not exists', 404)
    }

    surveyUser.value = Number(value)

    await surveysUsersRepository.save(surveyUser)

    return response.json(surveyUser)
  }
}

export { AnswerController }
