import { IsNotEmpty, IsNumber, IsOptional } from "class-validator"

export class PaginationQueryDto {
  @IsNumber()
  @IsOptional()
  pageNum?: number

  @IsNumber()
  @IsOptional()
  pageSize?: number
}
