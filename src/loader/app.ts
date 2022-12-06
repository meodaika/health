import {
  createExpressServer,
  useContainer,
  useExpressServer,
} from "routing-controllers"
import { createServer } from "http"
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
import ExcerciseController from "../controllers/excercise.controller"
import RecordController from "../controllers/record.controller"
import MealController from "../controllers/meal.controller"
import { configSocket } from "../utils/socket"
import { MessageController } from "../controllers/message.controller"
import { createSocketServer } from "socket-controllers"
import { SocketService } from "../services/socket.service"
import schedule from "node-schedule"
import { ScheduleService } from "../services/schedule.service"

export const setupServer = async () => {
  await initDatabase()

  /*   createSocketServer(8081, {
    controllers: [MessageController],
  }) */

  useContainer(Container)

  const app: Express = express()
  app.use("/uploads", express.static("uploads"))

  // configSocket(app)
  const socket = Container.get(SocketService)

  // init 3 times
  // run every 5 minute
  /* const rooms = {
    "07:00": {
      socketId: true,
      socketId2: {
        id: 234,
        type: "gym",
      },
    },
  }

  const connection = {
    id: "roomtime",
  } */

  const remindJob = Container.get(ScheduleService)

  configSwagger(app)

  // config controller
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
      ExcerciseController,
      RecordController,
      MealController,
    ],
    validation: { stopAtFirstError: true },
    cors: {
      origin: "*", // (note: do not use this in production)
    },
    middlewares: [HandleNotFound, CustomErrorHandler],
  })

  return app
}
