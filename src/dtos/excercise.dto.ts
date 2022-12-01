import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator"
import { PaginationQueryDto } from "./pagination.dto"

export class ExcerciseContentDto {
  @IsString()
  @IsNotEmpty()
  move: string

  @IsNumber()
  calo?: number

  @IsNumber()
  time?: number
}

export class ExcerciseDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ExcerciseContentDto)
  content: ExcerciseContentDto[]
}

export class ExcerciseQueryDto extends PaginationQueryDto {}
