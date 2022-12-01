import { Role } from "../entities/user.entity"

export interface ICurrentUser {
  id: number
  email: string
  role: Role
}
