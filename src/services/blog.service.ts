import { Service } from "typedi"
import { Repository } from "typeorm"
import { InjectRepository } from "typeorm-typedi-extensions"
import { BlogDto, BlogQueryDto } from "../dtos/user/blog/blog.dto"
import { Blog } from "../entities/blog.entity"
import { Category } from "../entities/category.entity"
import { Tag } from "../entities/tag.entity"
import HttpException from "../exceptions/http.exception"
import CategoryService from "./category.service"
import FileService from "./file.service"

@Service()
export default class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    private readonly categoryService: CategoryService,
    private readonly fileService: FileService
  ) {}

  async createBlog(
    blogData: BlogDto,
    photo: Express.Multer.File
  ): Promise<Blog> {
    let { tag, category } = blogData

    const categoryRecord = await this.categoryService.findById(category)
    if (!categoryRecord) throw new HttpException("Can not found category", 404)

    const tagIds = tag.split(",")
    const tags = await this.tagRepository.findByIds(tagIds)
    if (tagIds.length !== tags.length)
      throw new HttpException("Can not found tag", 404)

    let newBlogData: Partial<Blog> = {
      ...blogData,
      category: categoryRecord,
      tags: tags,
    }

    if (photo) {
      const fileName = await this.fileService.processPhoto(photo)
      newBlogData = {
        ...newBlogData,
        photo: fileName,
      }
    }

    const newBlog = await this.blogRepository.save(
      this.blogRepository.create(newBlogData)
    )
    if (!newBlog) throw new HttpException("Can not created blog")
    return newBlog
  }

  async listBlogs(query: BlogQueryDto): Promise<Blog[] | null> {
    const qb = await this.blogRepository
      .createQueryBuilder("blog")
      .leftJoinAndSelect("blog.category", "category")
      .leftJoinAndSelect("blog.tags", "tag")
      .orderBy("blog.id", "DESC")

    const { pageNum = 1, pageSize = 10, category, tag } = query
    qb.limit(pageSize)
    qb.offset(pageSize * (pageNum - 1))

    if (category) qb.where("category.id = :catId", { catId: category })
    if (tag) qb.where("tag.id = :tagId", { tagId: tag })

    let blogs = await qb.getMany()
    return blogs
  }
}
