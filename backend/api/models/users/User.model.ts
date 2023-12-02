import { Schema, Model, model, models } from 'mongoose'
import { IUserModel } from './IUser.interface'
import { AllRoles, Role } from './User.enum'

const UserSchema = new Schema(
  {
    _id: {
      type: String,
    },
    uuid: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: [true, 'Enter a username'],
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be empty"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    avatar: {
      type: String,
    },
    password: {
      type: String,
      required: [true, 'Enter a password'],
    },
    role: {
      type: String,
      enum: AllRoles,
      default: Role.USER,
    },
  },
  {
    _id: false,
    timestamps: true,
  },
)

UserSchema.methods.toJSONFor = function () {
  return {
    uuid: this.get('uuid'),
    role: this.get('role'),
    email: this.get('email'),
    phone: this.get('phone'),
    avatar: this.get('avatar'),
    username: this.get('username'),
    createdAt: this.get('createdAt'),
    updatedAt: this.get('updatedAt'),
  }
}

export const UserModel: Model<IUserModel> = models.User || model<IUserModel>('User', UserSchema)
