import { Document } from 'mongoose'
import { Role } from './User.enum'

export interface IUser extends Document {
  [x: string]: any
  role: Role
  uuid: string
  email: string
  phone?: string
  avatar?: string
  username: string
  password: string
}

export interface IUserModel extends IUser, Document {
  toJSONFor: () => IUserModel
}
