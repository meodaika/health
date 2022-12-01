import {
  Authorized,
  Body,
  CurrentUser,
  Get,
  JsonController,
  Param,
  Patch,
  Post,
  QueryParam,
  QueryParams,
} from "routing-controllers"
import { RecordDto, RecordQueryDto } from "../dtos/record.dto"
import { Record } from "../entities/record.entity"
import { ICurrentUser } from "../interfaces/currentUser.interface"
import { RecordUnitFilter } from "../interfaces/record.interface"
import RecordService from "../services/record.service"

@JsonController("/records")
@Authorized("USER")
class RecordController {
  constructor(private recordService: RecordService) {}
  @Post("/")
  async createRecord(
    @CurrentUser() user: ICurrentUser,
    @Body() recordData: RecordDto
  ): Promise<Record> {
    const newCategory = await this.recordService.createRecord(user, recordData)
    return newCategory
  }

  @Get("/")
  async getTags(
    @CurrentUser() user: ICurrentUser,
    @QueryParams() recordQuery: any
  ) {
    const records = await this.recordService.getRecords(
      user,
      recordQuery.timeType
    )
    return records
  }
}

export default RecordController
