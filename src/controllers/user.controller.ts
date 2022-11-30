import UserService from "../services/user.service"
import { Body, Get, JsonController, Post } from "routing-controllers"
// import { createUserDto } from "../dtos/user/createUser.dto"
import { SignUpDto } from "../dtos/user/signup.dto"
import { SignInDto } from "../dtos/user/signin.dto"
import { IAuthToken } from "../interfaces/token.interface"

@JsonController("/users")
class UserController {
  constructor(private userService: UserService) {}

  @Post("/sign-up")
  async signup(@Body() userSignupData: SignUpDto): Promise<boolean> {
    await this.userService.signUp(userSignupData)
    return true
  }

  @Post("/sign-in")
  async signin(@Body() userSigninData: SignInDto): Promise<IAuthToken> {
    const token = await this.userService.signIn(userSigninData)
    return token
  }
}

export default UserController
