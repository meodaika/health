import { Type } from "class-transformer"
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsRFC3339,
  IsString,
} from "class-validator"
import { RecordUnitFilter } from "../interfaces/record.interface"
import { PaginationQueryDto } from "./pagination.dto"

export class RecordDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  weight: number

  @IsNumber({ maxDecimalPlaces: 2 })
  fatPercent: number

  @IsNumber()
  @IsOptional()
  time: number
}

export class RecordQueryDto {
  @IsEnum(RecordUnitFilter)
  timeType: RecordUnitFilter
}
