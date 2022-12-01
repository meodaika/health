import { Exclude } from "class-transformer"
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm"
import { BaseEntity } from "./base.entity"
import { User } from "./user.entity"

@Entity()
export class Record extends BaseEntity {
  @Column({ nullable: true, type: "float" })
  weight: number

  @Column({ name: "fat_percent", nullable: true, type: "float" })
  fatPercent: number

  @Column({ type: "bigint", nullable: false })
  time: Date

  @Exclude()
  @ManyToOne(() => User)
  @JoinColumn({
    name: "user_id",
  })
  user!: User
}
