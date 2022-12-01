import { Exclude } from "class-transformer"
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm"
import { BaseEntity } from "./base.entity"
import { User } from "./user.entity"

@Entity()
export class Record extends BaseEntity {
  @Column({ nullable: true })
  weight: number

  @Column({ name: "fat_percent", nullable: true })
  fatPercent: number

  @Exclude()
  @ManyToOne(() => User)
  @JoinColumn({
    name: "user_id",
  })
  user!: User
}
