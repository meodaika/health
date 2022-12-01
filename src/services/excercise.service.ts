import { Service } from "typedi"
import { Repository } from "typeorm"
import { InjectRepository } from "typeorm-typedi-extensions"
import { DiaryDto, DiaryQueryDto } from "../dtos/diary.dto"
import { ExcerciseContentDto, ExcerciseDto } from "../dtos/excercise.dto"
import { Diary } from "../entities/diary.entity"
import { Excercise } from "../entities/exercise.entity"
import HttpException from "../exceptions/http.exception"
import { ICurrentUser } from "../interfaces/currentUser.interface"

@Service()
export default class ExcerciseService {
  constructor(
    @InjectRepository(Excercise)
    private readonly excerciseRepository: Repository<Excercise>
  ) {}

  async getExcercises(user: ICurrentUser, queryDiary: DiaryQueryDto) {
    const qb = await this.excerciseRepository
      .createQueryBuilder("excercise")
      .leftJoinAndSelect("excercise.user", "user")
      .where("user.id = :userId", { userId: user.id })

    const { pageNum = 1, pageSize = 4 } = queryDiary
    qb.limit(pageSize)
    qb.offset(pageSize * (pageNum - 1))

    let excercises = await qb.getMany()
    return excercises
  }

  async createDiary(
    user: ICurrentUser,
    excerciseData: ExcerciseDto
  ): Promise<Excercise> {
    return await this.excerciseRepository.save({
      content: excerciseData.content,
      user: user as any,
    })
  }

  async addMove(user: ICurrentUser, id: number, move: ExcerciseContentDto) {
    const exercise = await this.excerciseRepository.findOne(id, {
      relations: ["user"],
    })

    if (!exercise) throw new HttpException(`Can not found exercise`)
    console.log(exercise, "exercise:::")
    if (exercise.user.id !== user.id)
      throw new HttpException(`You dont have permission to update`, 403)

    const contentPack = [...exercise.content, move]
    exercise.content = contentPack
    await this.excerciseRepository.update(id, exercise)
    return exercise
  }
}
