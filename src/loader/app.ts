import express, { Express } from "express"
import cors from "cors"
import {
  catchError,
  handleNotFound,
} from "../middlewares/handleError.middleware"
import { configSwagger } from "../middlewares/swagger.middleware"

export const setupServer = (): Express => {
  const app: Express = express()
  app.use(cors())

  // config swagger
  configSwagger(app)

  // handle Error

  handleNotFound(app)
  catchError(app)

  return app
}
