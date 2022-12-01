import { Exclude } from "class-transformer"
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm"
import { BaseEntity } from "./base.entity"
import { User } from "./user.entity"

class ExcerciseContent {
  move: string

  calo?: number

  time?: number
}

@Entity()
export class Excercise extends BaseEntity {
  @Column("jsonb", { nullable: false, default: {} })
  content: ExcerciseContent[]

  @Exclude()
  @ManyToOne(() => User)
  @JoinColumn({
    name: "user_id",
  })
  user!: User
}
