import { Role } from "../entities/user.entity"

export interface IJwtPayload {
  id: number
  email: string
  role: Role
}
