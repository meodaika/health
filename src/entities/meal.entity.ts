import { Exclude } from "class-transformer"
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import { BaseEntity } from "./base.entity"
import { User } from "./user.entity"

export enum MealType {
  MORNING = "MORING",
  LUNCH = "LUNCH",
  DINNER = "DINNER",
  SNACK = "SNACK",
}

@Entity()
export class Meal extends BaseEntity {
  @Column()
  photo: string

  @Column()
  note: string

  @Column({ enum: MealType })
  type: MealType

  @Exclude()
  @ManyToOne(() => User)
  @JoinColumn({
    name: "user_id",
  })
  user!: User
}
