import { Schema, Model, model, models } from 'mongoose'
import { ITaskModel } from './ITask.interface'
import { AllStates, AllPriorities, TaskState, Priority } from './Task.enum'

const TaskSchema = new Schema(
  {
    _id: {
      type: String,
    },
    uuid: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Enter a task name'],
    },
    description: {
      type: String,
      required: [true, 'Enter a task description'],
    },
    startAt: {
      type: Date,
      required: [true, 'Enter a task startDate'],
    },
    endAt: {
      type: Date,
      required: [true, 'Enter a task endDate'],
    },
    userId: {
      type: String,
      require: true,
      ref: 'User',
    },
    priority: {
      type: String,
      enum: AllPriorities,
      default: Priority.LOW,
    },
    state: {
      type: String,
      enum: AllStates,
      default: TaskState.TODO,
    },
  },
  {
    _id: false,
    timestamps: true,
  },
)

TaskSchema.methods.toJSONFor = function () {
  return {
    uuid: this.get('uuid'),
    name: this.get('name'),
    state: this.get('state'),
    endAt: this.get('endAt'),
    userId: this.get('userId'),
    startAt: this.get('startAt'),
    priority: this.get('priority'),
    description: this.get('description'),
    createdAt: this.get('createdAt'),
    updatedAt: this.get('updatedAt'),
  }
}

export const TaskModel: Model<ITaskModel> = models.Task || model<ITaskModel>('Task', TaskSchema)
