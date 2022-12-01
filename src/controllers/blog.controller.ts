import {
  Authorized,
  Body,
  Get,
  JsonController,
  Param,
  Patch,
  Post,
  QueryParams,
  UploadedFile,
} from "routing-controllers"
import { photoUploadOptions } from "../configs/upload.config"
import { BlogDto, BlogQueryDto } from "../dtos/user/blog/blog.dto"
import { Blog } from "../entities/blog.entity"
import BlogService from "../services/blog.service"

@JsonController("/blogs")
@Authorized("ADMIN")
class BlogController {
  constructor(private blogService: BlogService) {}

  @Post("/")
  async createBlog(
    @UploadedFile("photo", { options: photoUploadOptions })
    photo: Express.Multer.File,
    @Body() blogData: BlogDto
  ): Promise<any> {
    const newBlog = await this.blogService.createBlog(blogData, photo)
    return newBlog
  }

  @Get("/")
  async listBlogs(
    @QueryParams() queryBlog: BlogQueryDto
  ): Promise<Blog[] | null> {
    return this.blogService.listBlogs(queryBlog)
  }
}

export default BlogController
