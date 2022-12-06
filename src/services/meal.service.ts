import { Service } from "typedi"
import { Repository } from "typeorm"
import { InjectRepository } from "typeorm-typedi-extensions"
import { MealDto, MealQueryDto } from "../dtos/meal.dto"
import { Meal } from "../entities/meal.entity"
import HttpException from "../exceptions/http.exception"
import { ICurrentUser } from "../interfaces/currentUser.interface"
import FileService from "./file.service"

@Service()
export default class MealService {
  constructor(
    @InjectRepository(Meal)
    private readonly mealRepository: Repository<Meal>,
    private readonly fileService: FileService
  ) {}

  async getMeals(user: ICurrentUser, queryMeal: MealQueryDto) {
    const qb = await this.mealRepository
      .createQueryBuilder("meal")
      .leftJoinAndSelect("meal.user", "user")
      .where("user.id = :userId", { userId: user.id })
      .orderBy("meal.id", "DESC")

    const { pageNum = 1, pageSize = 8, type } = queryMeal

    if (type) {
      qb.where("meal.type = :type", { type })
    }

    qb.limit(pageSize)
    qb.offset(pageSize * (pageNum - 1))

    let meals = await qb.getMany()
    return meals
  }

  async createMeal(
    user: ICurrentUser,
    photo: Express.Multer.File,
    mealData: MealDto
  ): Promise<Meal> {
    let meal = { ...mealData } as Meal
    if (photo) {
      const fileName = await this.fileService.processPhoto(photo)
      meal.photo = fileName
    }
    return await this.mealRepository.save({ ...meal, user: user as any })
  }
}
