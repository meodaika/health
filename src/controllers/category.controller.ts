import {
  Body,
  Get,
  JsonController,
  Param,
  Patch,
  Post,
} from "routing-controllers"
import { Category } from "../entities/category.entity"
import { CategoryDto } from "../dtos/user/blog/category.dto"
import CategoryService from "../services/category.service"

@JsonController("/categories")
class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get("/")
  async getCategories(): Promise<Category[] | null> {
    const categories = await this.categoryService.getCategories()
    return categories
  }

  @Post("/")
  async createCategory(@Body() catData: CategoryDto): Promise<Category> {
    const newCategory = await this.categoryService.createCategory(catData)
    return newCategory
  }

  @Patch("/:id")
  async updateCategory(
    @Param("id") id: number,
    @Body() catData: Partial<CategoryDto>
  ) {
    const resultUpdate = await this.categoryService.updateCategory(id, catData)
    return resultUpdate
  }
}

export default CategoryController
