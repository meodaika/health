import { Service } from "typedi"
import { Repository } from "typeorm"
import { InjectRepository } from "typeorm-typedi-extensions"
import { CategoryDto } from "../dtos/user/blog/category.dto"
import { Category } from "../entities/category.entity"
import HttpException from "../exceptions/http.exception"

@Service()
export default class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async getCategories(): Promise<Category[] | null> {
    return this.categoryRepository.find({ order: { order: "DESC" } })
  }

  async findById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ id })
    if (!category) throw new HttpException("Can not found category", 404)
    return category
  }

  async createCategory(categoryData: CategoryDto): Promise<Category> {
    return this.categoryRepository.save(
      this.categoryRepository.create(categoryData)
    )
  }

  async updateCategory(
    id: number,
    categoryData: Partial<CategoryDto>
  ): Promise<Category> {
    const category = await this.categoryRepository.findOne({ id })
    if (!category) throw new HttpException("Can not found category", 404)

    const updatedCat = await this.categoryRepository.save({
      ...category,
      ...categoryData,
    })
    if (!updatedCat) throw new HttpException("Can not update category")
    return updatedCat
  }
}
