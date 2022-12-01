import { Action } from "routing-controllers"
import * as jwt from "jsonwebtoken"
import { config } from "../configs/index.config"
import { IJwtPayload } from "../interfaces/jwtPayload.interface"

export const authMiddleware = async (action: Action, roles: string[]) => {
  const authHeader = action.request.headers["authorization"]

  if (!authHeader) return false
  const token = authHeader.split(" ")[1]
  const currentUser = (await jwt.verify(token, config.jwtSecret)) as IJwtPayload
  if (currentUser && !roles.length) return true
  if (
    currentUser &&
    roles.find((role) => currentUser.role.indexOf(role) !== -1)
  )
    return true

  return false
}
