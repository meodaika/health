import express, { Express } from "express"
import cors from "cors"
import {
  catchError,
  handleNotFound,
} from "../middlewares/handleError.middleware"

export const setupServer = (): Express => {
  const app: Express = express()
  app.use(cors())

  // handle Error

  handleNotFound(app)
  catchError(app)

  return app
}
