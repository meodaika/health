import { IsEnum, IsNumber, IsOptional } from "class-validator"
import { RecordUnitFilter } from "../interfaces/record.interface"

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
