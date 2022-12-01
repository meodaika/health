import { Service } from "typedi"
import { Repository } from "typeorm"
import { InjectRepository } from "typeorm-typedi-extensions"
import { TagDto } from "../dtos/user/blog/tag.dto"
import { Tag } from "../entities/tag.entity"
import HttpException from "../exceptions/http.exception"

@Service()
export default class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ) {}

  async getTags(): Promise<Tag[] | null> {
    return this.tagRepository.find()
  }

  async createTag(tagData: TagDto): Promise<Tag> {
    return this.tagRepository.save(this.tagRepository.create(tagData))
  }

  async updateTag(id: number, tagData: TagDto): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ id })
    if (!tag) throw new HttpException("Can not found tag", 404)

    const updatedTag = await this.tagRepository.save({
      ...tag,
      ...tagData,
    })
    if (!updatedTag) throw new HttpException("Can not update tag")
    return updatedTag
  }
}
