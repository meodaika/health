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
import { DiaryDto, DiaryQueryDto } from "../dtos/diary.dto"
import { Diary } from "../entities/diary.entity"
import { ICurrentUser } from "../interfaces/currentUser.interface"
import DiaryService from "../services/diary.service"

@Authorized("USER")
@JsonController("/diaries")
class DiaryController {
  constructor(private diaryService: DiaryService) {}

  @Get("/")
  async getDiary(
    @CurrentUser() user: ICurrentUser,
    @QueryParams() queryDiary: DiaryQueryDto
  ): Promise<Diary[] | null> {
    const diaries = await this.diaryService.getDiaries(user, queryDiary)
    return diaries
  }

  @Post("/")
  async createDiary(
    @CurrentUser() user: any,
    @Body() diaryData: DiaryDto
  ): Promise<Diary> {
    const newDiary = await this.diaryService.createDiary(user, diaryData)
    return newDiary
  }
}

export default DiaryController
