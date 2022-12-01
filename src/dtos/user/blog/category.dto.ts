import { IsNumber, IsOptional, IsString } from "class-validator"

export class CategoryDto {
  @IsString()
  name: string

  @IsNumber()
  @IsOptional()
  order?: number
}
