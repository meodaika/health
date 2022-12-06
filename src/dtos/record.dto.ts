import { Type } from "class-transformer"
import { IsEnum, IsNumber, IsOptional } from "class-validator"
import { RecordUnitFilter } from "../interfaces/record.interface"

export class RecordDto {
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  weight: number

  @Type(() => Number)
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
