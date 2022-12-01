import { IsNotEmpty, IsString } from "class-validator"
import { PaginationQueryDto } from "./pagination.dto"

export class DiaryDto {
  @IsString()
  @IsNotEmpty()
  content: string
}

export class DiaryQueryDto extends PaginationQueryDto {}
