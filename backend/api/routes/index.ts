import { Router } from 'express'
import { TaskRouter } from '../module/task/task.router'
import { AuthRouter } from '../module/auth/auth.router'

export class GlobalRouter {
  router: Router
  private authRouter: AuthRouter
  private taskRouter: TaskRouter

  constructor() {
    this.router = Router()
    this.authRouter = new AuthRouter()
    this.taskRouter = new TaskRouter()
    this.initRoutes()
  }

  private initRoutes() {
    this.router.use('/auth', this.authRouter.router)
    this.router.use('/task', this.taskRouter.router)
  }
}
