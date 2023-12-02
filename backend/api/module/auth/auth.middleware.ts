import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string | undefined = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ msg: 'No authentication token provided, authorization denied.' })
    }

    const secretKey = process.env.SECRET_JWT_KEY

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ msg: 'Token verification failed, authorization denied.' })
      }
      req['authUser'] = decoded
      next()
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
