import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from "typeorm"
import slugify from "slugify"
import { BaseEntity } from "./base.entity"
import { Blog } from "./blog.entity"

@Entity()
export class Category extends BaseEntity {
  @Column()
  name: string

  @Column({ default: 0 })
  order: number

  @Column()
  slug: string

  @OneToMany(() => Blog, (blog) => blog.category)
  blogs: Array<Blog>

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    this.slug = slugify(this.name)
  }
}
