import { Router } from 'express'

import { UserController } from './controllers/UserController'
import { SurveysController } from './controllers/SurveysController'
import { SendMailController } from './controllers/SendMailController'
import { AnswerController } from './controllers/AnswerController'
import { NpsController } from './controllers/NpsController'

const routes = Router()

const userController = new UserController()
const surveyController = new SurveysController()
const sendMailController = new SendMailController()
const answerController = new AnswerController()
const npsController = new NpsController()

routes.post('/users', userController.create)

routes.post('/surveys', surveyController.create)
routes.get('/surveys', surveyController.index)

routes.post('/sendMail', sendMailController.send)

routes.get('/answers/:value', answerController.execute)

routes.get('/nps/:survey_id', npsController.execute)

export { routes }