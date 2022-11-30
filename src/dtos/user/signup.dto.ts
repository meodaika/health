import { IsEmail, IsString, MinLength, MaxLength } from "class-validator"

export class SignUpDto {
  @IsString()
  @MinLength(10)
  @IsEmail()
  email!: string

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  username: string

  @IsString()
  @MinLength(6)
  password!: string
}
