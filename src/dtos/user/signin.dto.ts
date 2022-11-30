import { IsEmail, IsString, MinLength } from "class-validator"

export class SignInDto {
  @IsString()
  @MinLength(10)
  @IsEmail()
  email!: string

  @IsString()
  @MinLength(6)
  password!: string
}
