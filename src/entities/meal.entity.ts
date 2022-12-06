import { Exclude, Expose } from "class-transformer"
import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm"
import { config } from "../configs/index.config"
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

  @AfterLoad()
  photoFullUrl() {
    this.thumbnail = config.photoUrl + "thumbnail/" + this.photo
    this.photo = config.photoUrl + this.photo
  }

  thumbnail: string

  /*  @Expose()
  public get thumbnail() {
    return `${config.photoUrl}thumbnail/${this.photo}`
  } */
}
