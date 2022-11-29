import { Service } from "typedi"
import { Repository } from "typeorm"
import { InjectRepository } from "typeorm-typedi-extensions"
import { User } from "../entities/user.entity"

@Service()
export default class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  public async findAll() {
    return this.userRepository.find()
  }
}
