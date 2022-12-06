import * as bcrypt from "bcrypt"
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { lowercase } from "../utils/model.util"

const defaultScheduleNoti: { [k: string]: string } = {
  "0900": "exercise",
}

export enum Role {
  User = "USER",
  Admin = "ADMIN",
}

type NotiPoint = "morning" | "lunch" | "dinner" | "exercise"

type IUserNotify = Record<NotiPoint, string>

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public username: string

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

  @Column({ type: "enum", enum: Role, default: Role.User })
  public role: Role

  @Column("jsonb", { nullable: true, default: defaultScheduleNoti })
  public notify: IUserNotify

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }

  async checkPasswordMatch(plainPassword: string): Promise<boolean> {
    console.log(plainPassword, this.password)
    return bcrypt.compare(plainPassword, this.password)
  }
}
