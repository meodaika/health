import { Express, Request, Response, NextFunction } from "express"
import {
  ExpressErrorMiddlewareInterface,
  ExpressMiddlewareInterface,
  Middleware,
} from "routing-controllers"
import HttpException from "../exceptions/http.exception"
import { getRequestContext } from "../utils/asyncStorage"

@Middleware({ type: "after" })
export class HandleNotFound implements ExpressMiddlewareInterface {
  use(request: Request, response: any, next: (err: any) => any) {
    if (!response.headersSent) {
      const error: HttpException = new HttpException("Not Found", 404)
      next(error)
    }
  }
}

@Middleware({ type: "after" })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(
    error: any,
    request: Request,
    response: Response,
    next: (err: any) => any
  ) {
    console.log("errr:::", error)
    if (!response.headersSent)
      response.json({
        errors: {
          message: error.message,
        },
      })
  }
}
