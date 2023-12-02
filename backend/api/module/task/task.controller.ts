import { Request, Response } from 'express'
import { TaskService } from './task.service'

export class TaskController {
  private taskService: TaskService

  constructor() {
    this.taskService = new TaskService()
  }

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const userId = req['authUser'].userId
    try {
      const [allTasks, total] = await this.taskService.getAllTask(userId)

      return res.status(201).json({
        message: 'All user tasks',
        tasks: allTasks,
        total,
      })
    } catch (error) {
      console.error({ error })
      return res.status(500).json({
        message: error.message,
      })
    }
  }

  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = req['authUser'].userId
      const newTask = await this.taskService.createOne(userId, req.body)
      if (newTask == null) {
        return res.status(404).json({
          message: 'NO_USER_FOUND_TO_CREATE_TASK',
        })
      }
      return res.status(201).json({
        message: 'Tâche crées avec succès !',
        task: newTask,
      })
    } catch (error) {
      console.error({ error })
      return res.status(500).json({
        message: error.message,
      })
    }
  }

  public searchTask = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = req['authUser'].userId

      const [allTasks, total] = await this.taskService.filterTask(userId, req.body)
      return res.status(201).json({
        message: 'Tâches trouvées',
        tasks: allTasks,
        total,
      })
    } catch (error) {
      console.error({ error })
      return res.status(500).json({
        message: error.message,
      })
    }
  }

  public update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = req['authUser'].userId
      const { id } = req.params
      const updates = req.body
      const updatedTask = await this.taskService.update(id, updates, userId)
      if (updatedTask == null) {
        return res.status(404).json({
          message: 'NO_TASK_FOUND',
        })
      }
      return res.status(201).json({
        message: 'Tâche mis à jour !',
        task: updatedTask,
      })
    } catch (error) {
      console.error({ error })
      return res.status(500).json({
        message: error.message,
      })
    }
  }

  public delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params
      const userId = req['authUser'].userId
      const taskExist = await this.taskService.getOne(id, userId)

      if (!taskExist) {
        return res.status(404).json({
          message: 'NO_TASK_FOUND_TO_DELETE',
        })
      }
      await this.taskService.deleteOne(taskExist.uuid, userId)
      return res.status(201).json({
        message: 'Tâche supprimée avec succès !',
      })
    } catch (error) {
      console.error({ error })
      return res.status(500).json({
        message: error.message,
      })
    }
  }

  public deleteMany = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { ids } = req.body
      const userId = req['authUser'].userId
      const isDeleted = await this.taskService.deleteMany(ids, userId)
      if (isDeleted == false) {
        return res.status(404).json({
          message: 'NO_TASK_FOUND_TO_DELETE',
        })
      }
      return res.status(201).json({
        message: 'Tâche supprimées avec succès !',
        tasks: ids,
      })
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      })
    }
  }
}
