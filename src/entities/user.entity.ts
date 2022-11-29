import { Column, Entity, PrimaryColumn } from "typeorm"
import { lowercase } from "../utils/model.util"

export enum Role {
  User = "USER",
  Admin = "ADMIN",
}

@Entity()
export class User {
  @PrimaryColumn()
  public id: number

  @Column()
  public name: string

  @Column({
    unique: true,
    nullable: false,
    transformer: [lowercase],
  })
  public email: string

  @Column({
    select: false,
    nullable: false,
  })
  public password: string

  @Column({
    select: false,
    nullable: false,
  })
  public salt: string

  @Column({ type: "enum", enum: Role, default: Role.User })
  public role: Role
}
