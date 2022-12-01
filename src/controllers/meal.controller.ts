import {
  Authorized,
  Body,
  CurrentUser,
  Get,
  JsonController,
  Param,
  Patch,
  Post,
  QueryParams,
  UploadedFile,
} from "routing-controllers"
import { photoUploadOptions } from "../configs/upload.config"
import { MealDto, MealQueryDto } from "../dtos/meal.dto"
import { Meal } from "../entities/meal.entity"
import { ICurrentUser } from "../interfaces/currentUser.interface"
import MealService from "../services/meal.service"

@Authorized("USER")
@JsonController("/meals")
class MealController {
  constructor(private mealService: MealService) {}

  @Get("/")
  async getMeal(
    @CurrentUser() user: ICurrentUser,
    @QueryParams() queryMeal: MealQueryDto
  ): Promise<Meal[] | null> {
    const diaries = await this.mealService.getMeals(user, queryMeal)
    return diaries
  }

  @Post("/")
  async createMeal(
    @CurrentUser() user: any,
    @UploadedFile("photo", { options: photoUploadOptions })
    photo: Express.Multer.File,
    @Body() mealData: MealDto
  ): Promise<Meal> {
    const newMeal = await this.mealService.createMeal(user, photo, mealData)
    return newMeal
  }
}

export default MealController
