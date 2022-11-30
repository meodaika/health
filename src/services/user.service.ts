import { Service } from "typedi"
import { Repository } from "typeorm"
import * as jwt from "jsonwebtoken"
import { InjectRepository } from "typeorm-typedi-extensions"
import { SignInDto } from "../dtos/user/signin.dto"
import { SignUpDto } from "../dtos/user/signup.dto"
import { Role, User } from "../entities/user.entity"
import HttpException from "../exceptions/http.exception"
import { IJwtPayload } from "../interfaces/jwtPayload.interface"
import { config } from "../configs/index.config"
import { IAuthToken } from "../interfaces/token.interface"

@Service()
export default class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async signUp(userSignupData: SignUpDto) {
    const { email } = userSignupData

    const user = await this.userRepository.findOne({ where: { email } })

    if (user) {
      throw new HttpException(`User with email ${email} already exists`, 400)
    }
    const newUser = await this.userRepository.save(
      this.userRepository.create(userSignupData)
    )

    return newUser
  }

  async signIn(userSignInData: SignInDto): Promise<IAuthToken> {
    const { email, password } = userSignInData

    const user = await this.userRepository.findOne({
      where: { email },
      select: ["id", "password", "email", "role"],
    })

    if (!user) {
      throw new HttpException(`User with email ${email} not exists`)
    }
    console.log(user, "user::")
    const checkPasswordMatch = await user.checkPasswordMatch(password)
    if (checkPasswordMatch === false) {
      throw new HttpException(`Password is not correct`)
    }

    const jwtPayload: IJwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    }

    const token = this.generateToken(jwtPayload)
    if (!token) throw new HttpException(`Cannot create token`)
    return { token }
  }

  private generateToken(jwtPayload: IJwtPayload): string {
    const today = new Date()
    const exp = new Date(today)
    exp.setDate(today.getDate() + 60)

    return jwt.sign(
      {
        ...jwtPayload,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret
    )
  }
}
