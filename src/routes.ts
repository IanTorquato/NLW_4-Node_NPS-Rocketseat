import { Router } from 'express'

import { UserController } from './controllers/UserController'
import { SurveysController } from './controllers/SurveysController'
import { SendMailController } from './controllers/SendMailController'

const routes = Router()

const userController = new UserController()
const surveyController = new SurveysController()
const sendMailController = new SendMailController()

routes.post('/users', userController.create)

routes.post('/surveys', surveyController.create)
routes.get('/surveys', surveyController.index)

routes.post('/sendMail', sendMailController.send)

export { routes }