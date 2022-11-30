import * as bcrypt from "bcrypt"
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { lowercase } from "../utils/model.util"

export enum Role {
  User = "USER",
  Admin = "ADMIN",
}

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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }

  async checkPasswordMatch(plainPassword: string): Promise<boolean> {
    console.log(plainPassword, this.password)
    return bcrypt.compare(plainPassword, this.password)
  }
}
