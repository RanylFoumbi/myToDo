import { Document } from 'mongoose'
import { Priority, TaskState } from './Task.enum'

export interface ITask extends Document {
  [x: string]: any
  endAt: Date
  uuid: string
  name: string
  startAt: Date
  userId: string
  state?: TaskState
  priority?: Priority
  description: string
}

export interface ITaskModel extends ITask, Document {
  toJSONFor: () => ITaskModel
}
