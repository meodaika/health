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

@Route("users")
export class UsersController extends Controller {
  @Get()
  public async getUsers() {
    return 1
  }
}
