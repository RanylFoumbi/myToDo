import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { IUser, IUserModel, Role, UserModel } from '../../models'
import { NewUuid } from '../../utils/uuid.utils'

export class AuthService {
  public generateToken = (email: string, userId: string, role: Role): string => {
    const token: string = jwt.sign({ email, userId, role }, process.env.SECRET_JWT_KEY, { expiresIn: '24h' })
    return token
  }

  public hashPassword = async (password: string): Promise<string> => {
    const hashedPassword: string = await bcrypt.hash(password, 10)
    return hashedPassword
  }

  public getOne = async (email: string): Promise<IUser | null> => {
    const user = await UserModel.findOne({ email: email }).exec()
    return user
  }

  public getAllUsers = async (): Promise<IUser[] | null> => {
    const users = await UserModel.find({}).exec()
    return users
  }

  public createUser = async (
    role: string,
    email: string,
    username: string,
    hashedPassword: string,
  ): Promise<IUserModel> => {
    const newUuid: string = NewUuid()
    const newUser = new UserModel({
      _id: newUuid,
      role: role,
      email: email,
      uuid: newUuid,
      username: username,
      password: hashedPassword,
    })

    const createdUser = await newUser.save()
    return createdUser
  }
}
