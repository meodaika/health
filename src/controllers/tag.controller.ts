import {
  Authorized,
  Body,
  Get,
  JsonController,
  Param,
  Patch,
  Post,
} from "routing-controllers"
import { TagDto } from "../dtos/user/blog/tag.dto"
import { Tag } from "../entities/tag.entity"
import TagService from "../services/tag.service"

@JsonController("/tags")
@Authorized("ADMIN")
class TagController {
  constructor(private tagService: TagService) {}

  @Get("/")
  async getTags(): Promise<Tag[] | null> {
    const tags = await this.tagService.getTags()
    return tags
  }

  @Post("/")
  async createTag(@Body() tagData: TagDto): Promise<Tag> {
    const newCategory = await this.tagService.createTag(tagData)
    return newCategory
  }

  @Patch("/:id")
  async updateTag(@Param("id") id: number, @Body() tagData: TagDto) {
    const resultUpdate = await this.tagService.updateTag(id, tagData)
    return resultUpdate
  }
}

export default TagController
