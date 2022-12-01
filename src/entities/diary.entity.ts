import { Exclude } from "class-transformer"
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import { BaseEntity } from "./base.entity"
import { User } from "./user.entity"

@Entity()
export class Diary extends BaseEntity {
  @Column({ type: "text", default: null })
  content: string

  @Exclude()
  @ManyToOne(() => User)
  @JoinColumn({
    name: "user_id",
  })
  user!: User
}
