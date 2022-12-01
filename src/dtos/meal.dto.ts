import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { MealType } from "../entities/meal.entity"
import { PaginationQueryDto } from "./pagination.dto"

export class MealDto {
  @IsString()
  @IsOptional()
  note: string

  @IsString()
  type: string
}

export class MealQueryDto extends PaginationQueryDto {
  @IsString()
  @IsOptional()
  type: string
}
