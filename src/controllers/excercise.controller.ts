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
} from "routing-controllers"
import {
  ExcerciseContentDto,
  ExcerciseDto,
  ExcerciseQueryDto,
} from "../dtos/excercise.dto"
import { Diary } from "../entities/diary.entity"
import { Excercise } from "../entities/exercise.entity"
import { ICurrentUser } from "../interfaces/currentUser.interface"
import ExcerciseService from "../services/excercise.service"

@Authorized("USER")
@JsonController("/exercises")
class ExcerciseController {
  constructor(private excerciseService: ExcerciseService) {}

  @Get("/")
  async getExcercise(
    @CurrentUser() user: ICurrentUser,
    @QueryParams() queryDiary: ExcerciseQueryDto
  ): Promise<Excercise[] | null> {
    const excercises = await this.excerciseService.getExcercises(
      user,
      queryDiary
    )
    return excercises
  }

  @Post("/")
  async createDiary(
    @CurrentUser() user: any,
    @Body() excerciseData: ExcerciseDto
  ): Promise<Excercise> {
    const newExcercise = await this.excerciseService.createDiary(
      user,
      excerciseData
    )
    return newExcercise
  }

  @Post("/:id/move")
  async addMove(
    @CurrentUser() user: any,
    @Param("id") id: number,
    @Body() moveData: ExcerciseContentDto
  ): Promise<Excercise> {
    const excercise = await this.excerciseService.addMove(user, id, moveData)
    return excercise
  }
}

export default ExcerciseController
