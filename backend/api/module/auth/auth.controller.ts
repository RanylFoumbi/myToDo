import * as bcrypt from 'bcrypt'

import { Request, Response } from 'express'
import { IUser, Role } from '../../models'
import { AuthService } from './auth.service'

export class AuthController {
  private authService: AuthService

  constructor() {
    this.authService = new AuthService() // Initialize the authService in the constructor
  }

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body

    try {
      const user = await this.authService.getOne(email)

      if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password)

        if (passwordMatch) {
          const token: string = this.authService.generateToken(user.email, user.uuid, user.role)
          const now: Date = new Date()
          const expiresDate: number = now.getTime() + 60 * 60 * 24 * 1000

          return res.status(201).json({
            message: 'Utilisateur connecté avec succès',
            token: token,
            user: user.toJSONFor(),
            expires_at: new Date(expiresDate),
          })
        } else {
          return res.status(401).json({
            message: 'WRONG_PASSWORD',
          })
        }
      } else {
        return res.status(404).json({
          message: 'EMAIL_NOT_EXIST',
        })
      }
    } catch (error) {
      console.error('Authentication error:', error)

      return res.status(500).json({
        message: "Échec d'authentification",
        error: error.message,
      })
    }
  }

  public register = async (req: Request, res: Response): Promise<Response> => {
    const { email, password, username, role } = req.body

    try {
      const user = await this.authService.getOne(email)

      if (user) {
        return res.status(409).json({
          message: 'EMAIL_EXIST',
        })
      } else {
        const hashedPassword: string = await this.authService.hashPassword(password)

        const createdUser = await this.authService.createUser(role, email, username, hashedPassword)

        const now: Date = new Date()

        const expiresDate: number = now.getTime() + 60 * 60 * 24 * 1000

        return res.status(201).json({
          message: 'Compte crée avec succès !',
          user: createdUser.toJSONFor(),
          expiresDate: expiresDate,
        })
      }
    } catch (error) {
      console.error("Échec d'authentication :", error)

      return res.status(500).json({
        message: "Échec d'authentification",
        error: error.message,
      })
    }
  }

  /**
   * getUsers
   */
  public getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
      const currentUserRole = req['authUser'].role
      if (!(currentUserRole && (currentUserRole === Role.ADMIN || currentUserRole === Role.SUPER_ADMIN))) {
        return res.status(403).json({
          message: "Vous n'avez pas les droits nécessaires",
        })
      }
      const userList: IUser[] = await this.authService.getAllUsers()
      return res.status(201).json({
        users: userList.map((user) => user.toJSONFor()),
      })
    } catch (error) {
      console.error({ error })
      return res.status(500).json({
        error: error,
      })
    }
  }
  public generateToken = async (req: Request, res: Response): Promise<Response> => {
    const { email, userId, role } = req.body

    try {
      const token: string = this.authService.generateToken(email, userId, role)

      const now: Date = new Date()

      const expiresDate: number = now.getTime() + 60 * 60 * 24 * 1000

      return res.status(201).json({
        token: token,
        expiresDate: expiresDate,
      })
    } catch (error) {
      console.error({ error })
      return res.status(500).json({
        error: error,
      })
    }
  }
}
