import { Exclude } from "class-transformer"
import slugify from "slugify"
import striptags from "striptags"
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from "typeorm"
import { config } from "../configs/index.config"
import { BaseEntity } from "./base.entity"
import { Category } from "./category.entity"
import { Tag } from "./tag.entity"

@Entity()
export class Blog extends BaseEntity {
  @Column()
  title!: string

  @Column()
  slug: string

  @Column()
  summary: string

  @Column({ type: "text", default: null })
  content: string

  @Column({ nullable: true })
  photo: string

  @ManyToOne(() => Category, (category) => category.blogs, {
    cascade: true,
  })
  @JoinColumn({
    name: "category_id",
  })
  category: Category

  @ManyToMany(() => Tag, (tag) => tag.blogs)
  @JoinTable({
    name: "post_tag",
    joinColumns: [{ name: "post_id" }],
    inverseJoinColumns: [{ name: "tag_id" }],
  })
  tags: Tag[]

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    this.slug = slugify(this.title)
  }

  @BeforeInsert()
  @BeforeUpdate()
  htmlToSummary() {
    if (this.summary) return false
    let summary = striptags(this.content)
    summary = summary.replace(/^\s+|\s+$/g, "")
    summary = summary.replace(/\s+|\n$/g, " ")
    summary = summary.substr(0, config.blogSummaryLength)
    this.summary = summary
  }
}
