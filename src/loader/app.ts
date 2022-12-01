import {
  createExpressServer,
  useContainer,
  useExpressServer,
} from "routing-controllers"
import express, { Express } from "express"
import * as path from "path"
import Container from "typedi"
import UserController from "../controllers/user.controller"
import {
  CustomErrorHandler,
  HandleNotFound,
} from "../middlewares/handleError.middleware"
import { configSwagger } from "../middlewares/swagger.middleware"
import { initDatabase } from "./database"
import CategoryController from "../controllers/category.controller"
import TagController from "../controllers/tag.controller"
import BlogController from "../controllers/blog.controller"
import {
  authMiddleware,
  currentUserChecker,
} from "../middlewares/auth.middleware"
import DiaryController from "../controllers/diary.controller"

export const setupServer = async () => {
  await initDatabase()

  useContainer(Container)

  const app: Express = express()
  configSwagger(app)

  useExpressServer(app, {
    authorizationChecker: authMiddleware,
    currentUserChecker,
    defaultErrorHandler: false,
    controllers: [
      UserController,
      CategoryController,
      TagController,
      BlogController,
      DiaryController,
    ],
    // controllers: [path.join(__dirname + "../controllers/*.controller.ts")],
    cors: true,
    middlewares: [HandleNotFound, CustomErrorHandler],
  })

  /* const app = createExpressServer({
    defaultErrorHandler: false,
    controllers: [
      UserController,
      CategoryController,
      TagController,
      BlogController,
    ],
    // controllers: [path.join(__dirname + "../controllers/*.controller.ts")],
    cors: true,
    middlewares: [HandleNotFound, CustomErrorHandler],
  })
 */

  return app
}
