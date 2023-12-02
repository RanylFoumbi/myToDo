import { TaskModel, ITaskModel, ITask, UserModel, TaskState, Priority } from '../../models'
import { NewUuid } from '../../utils/uuid.utils'

export class TaskService {
  public getAllTask = async (userId: string): Promise<[ITaskModel[], number] | null> => {
    try {
      const [allTasks, total] = await Promise.all([
        TaskModel.find({ userId: userId }).populate('userId').exec(),
        TaskModel.countDocuments({ userId: userId }).exec(),
      ])
      return [allTasks.map((task) => task.toJSONFor()), total]
    } catch (error) {
      throw new Error(error.message)
    }
  }

  public filterTask = async (
    userId: string,
    filters: { userId: string; state?: TaskState[]; priority?: Priority[]; search?: string },
  ): Promise<[ITaskModel[], number] | null> => {
    const query = {
      userId: userId,
    }
    // for array filter
    ;['state', 'priority'].forEach((elt) => {
      if (filters?.[elt].length > 0) query[elt] = { $in: filters?.[elt] }
    })
    // for string filter
    ;['search'].forEach((elt) => {
      if (filters?.[elt] && filters?.[elt].length > 0)
        query['$or'] = [{ name: new RegExp(filters?.[elt], 'i') }, { description: new RegExp(filters?.[elt], 'i') }]
    })

    try {
      const [allTasks, total] = await Promise.all([
        TaskModel.find(query).populate('userId').exec(),
        TaskModel.countDocuments(query).exec(),
      ])
      console.info({ allTasks })
      return [allTasks.map((task) => task.toJSONFor()), total]
    } catch (error) {
      throw new Error(error.message)
    }
  }

  public getOne = async (taskId: string, userId: string): Promise<ITaskModel | null> => {
    try {
      const response = await TaskModel.findOne({ uuid: taskId, userId: userId }).populate('userId').exec()
      if (!response) {
        return Promise.resolve(null)
      }
      return response
    } catch (error) {
      throw new Error(error.message)
    }
  }

  public createOne = async (userId: string, task: ITask): Promise<ITaskModel | null> => {
    try {
      const user = await UserModel.findOne({ uuid: userId }).exec()
      if (!user) {
        return Promise.resolve(null)
      }
      console.log({ task })
      const newUuid: string = NewUuid()
      const newTask = new TaskModel({
        _id: newUuid,
        uuid: newUuid,
        userId: userId,
        name: task.name,
        endAt: task.endAt,
        startAt: task.startAt,
        description: task.description,
      })

      //For optional params
      ;['state', 'priority'].forEach((elt: string) => {
        if (task?.[elt]) newTask[elt] = task[elt]
      })

      const response = await newTask.save()
      return Promise.resolve(response.toJSONFor())
    } catch (error) {
      throw new Error(error.message)
    }
  }

  public async update(taskId: string, updates: Partial<ITask>, userId: string): Promise<ITaskModel | null> {
    try {
      const task = await this.getOne(taskId, userId)
      if (!task) {
        return Promise.resolve(null)
      }
      //For optional params
      ;['name', 'description', 'state', 'priority', 'startAt', 'endAt'].forEach((elt) => {
        if (updates?.[elt]) task[elt] = updates[elt]
      })
      const response = await task.save()

      return Promise.resolve(response.toJSONFor())
    } catch (error) {
      console.log({ error })
      throw new Error(error.message)
    }
  }

  public deleteOne = async (taskId: string, userId: string): Promise<boolean> => {
    try {
      const result = await TaskModel.findOneAndDelete({ uuid: taskId, userId: userId }).exec()

      if (!result) {
        return false
      }

      return true
    } catch (error) {
      throw new Error(error.message)
    }
  }

  public deleteMany = async (taskIds: string[], userId: string): Promise<boolean> => {
    try {
      const result = await TaskModel.deleteMany({ uuid: { $in: taskIds }, userId }).exec()

      if (result.deletedCount == 0) {
        return false
      }

      return true
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
