import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
} from "tsoa"
import Container from "typedi"
import UserService from "../services/user.service"

@Route("users")
export class UsersController extends Controller {
  private userService: UserService
  constructor() {
    super()
    this.userService = Container.get(UserService)
  }

  @Get()
  public async getUsers() {
    return this.userService.findAll()
  }
}
