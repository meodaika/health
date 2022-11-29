import { Service } from "typedi"

@Service()
export default class UserService {
  public async findAll() {
    return 123
  }
}
