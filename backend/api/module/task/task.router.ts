import { Router } from 'express'
import { validator } from '../../utils/validator.utils'
import { checkAuth } from '../auth/auth.middleware'
import { TaskController } from './task.controller'
import {
  CreateTaskValidator,
  DeleteManyTaskValidator,
  SearchTaskValidator,
  UpdateTaskValidator,
} from './task.validator'

export class TaskRouter {
  router: Router
  private taskController: TaskController

  constructor() {
    this.router = Router()
    this.taskController = new TaskController()
    this.initRoutes()
  }

  private initRoutes() {
    this.router.get('/all', checkAuth, this.taskController.getAll)
    this.router.post('/create', checkAuth, validator.body(CreateTaskValidator), this.taskController.create)
    this.router.patch('/update/:id', checkAuth, validator.body(UpdateTaskValidator), this.taskController.update)
    this.router.delete('/delete/:id', checkAuth, this.taskController.delete)
    this.router.post('/search', checkAuth, validator.body(SearchTaskValidator), this.taskController.searchTask)
    this.router.delete(
      '/delete-many',
      checkAuth,
      validator.body(DeleteManyTaskValidator),
      this.taskController.deleteMany,
    )
  }
}
