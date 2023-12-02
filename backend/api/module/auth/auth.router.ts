import { Router } from 'express'
import { validator } from '../../utils/validator.utils'
import { AuthController } from './auth.controller'
import { checkAuth } from './auth.middleware'
import { GenTokenValidator, LoginValidator, RegisterValidator } from './auth.validator'

export class AuthRouter {
  router: Router
  private authController: AuthController

  constructor() {
    this.router = Router()
    this.authController = new AuthController()
    this.initRoutes()
  }

  private initRoutes() {
    this.router.get('/users', checkAuth, this.authController.getUsers)
    this.router.post('/login', validator.body(LoginValidator), this.authController.login)
    this.router.post('/register', validator.body(RegisterValidator), this.authController.register)
    this.router.post('/generate-token', validator.body(GenTokenValidator), this.authController.generateToken)
  }
}
