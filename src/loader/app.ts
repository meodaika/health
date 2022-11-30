import express, { Express } from "express"
import { createExpressServer, useContainer } from "routing-controllers"
import Container from "typedi"
import UserController from "../controllers/user.controller"
import {
  CustomErrorHandler,
  HandleNotFound,
} from "../middlewares/handleError.middleware"
import { configSwagger } from "../middlewares/swagger.middleware"
import { initDatabase } from "./database"

export const setupServer = async () => {
  await initDatabase()

  useContainer(Container)
  // const app: Express = express()
  const app = createExpressServer({
    defaultErrorHandler: false,
    controllers: [UserController],
    cors: true,
    middlewares: [HandleNotFound, CustomErrorHandler],
  })

  // config swagger
  // configSwagger(app)

  return app
}
