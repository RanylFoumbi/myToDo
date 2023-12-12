import * as express from 'express'
import * as corsPolicy from 'cors'
import * as morgan from 'morgan'
import { GlobalRouter } from './routes'
import { connectTodb } from './utils/mongoose.utils'
import * as dotenv from 'dotenv'

class App {
  private app: express.Application
  private globalRouter: GlobalRouter

  constructor() {
    dotenv.config()
    this.app = express()
    this.configureMiddleware()
    this.globalRouter = new GlobalRouter()
    this.configureRoutes()
    this.connectToDatabase()
    this.listen()
  }

  private configureMiddleware(): void {
    this.app.use(morgan(process.env.NODE_ENV))
    this.app.use(corsPolicy())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  public listen(): void {
    this.app.listen(process.env.APP_PORT, () => {
      console.log(`Server started on http://${process.env.APP_HOST}:${process.env.APP_PORT}`)
    })
  }

  private configureRoutes() {
    this.app.use('/api', this.globalRouter.router)
  }

  private async connectToDatabase(): Promise<void> {
    const { NODE_ENV, MONGO_USER, MONGO_PASSWORD, MONGO_PATH, MONGO_URI } = process.env

    let mongoUri = MONGO_URI

    if (NODE_ENV === 'staging' || NODE_ENV === 'prod') {
      mongoUri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`
    }

    await connectTodb(mongoUri as string)
  }
}

export default new App()
