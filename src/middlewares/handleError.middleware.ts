import { Express, Request, Response, NextFunction } from "express"
import HttpException from "../exceptions/http.exception"
export const handleNotFound = (app: Express) => {
  app.use((req, res, next) => {
    const error: HttpException = new HttpException(404, "Not Found")
    next(error)
  })
}

export const catchError = (app: Express) => {
  app.use(
    (err: HttpException, req: Request, res: Response, next: NextFunction) => {
      res.status(err.status || 500)
      res.json({
        errors: {
          message: err.message,
        },
      })
    }
  )
}
