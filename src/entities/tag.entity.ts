import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
} from "typeorm"
import slugify from "slugify"
import { BaseEntity } from "./base.entity"
import { Blog } from "./blog.entity"

@Entity()
export class Tag extends BaseEntity {
  @Column()
  name: string

  @Column()
  slug: string

  @ManyToMany(() => Blog, (blog) => blog.tags)
  blogs: Array<Blog>

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    this.slug = slugify(this.name)
  }
}
