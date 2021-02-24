import { Router } from 'express'

import { UserController } from './controllers/UserController'
import { SurveysController } from './controllers/SurveysController'

const routes = Router()

const userController = new UserController()
const surveyController = new SurveysController()

routes.post('/users', userController.create)

routes.post('/surveys', surveyController.create)

export { routes }