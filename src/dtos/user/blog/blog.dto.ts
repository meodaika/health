import { Transform, Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class BlogDto {
  @IsString()
  @IsNotEmpty()
  title!: string

  @IsOptional()
  summary?: string

  @IsString()
  content: string

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  category!: number

  @IsOptional()
  tag: string
}

export class BlogQueryDto {
  @IsNumber()
  @IsOptional()
  pageNum?: number

  @IsNumber()
  @IsOptional()
  pageSize?: number

  @IsNumber()
  @IsOptional()
  category?: number

  @IsNumber()
  @IsOptional()
  tag?: number
}
