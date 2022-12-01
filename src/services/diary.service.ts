import { Service } from "typedi"
import { Repository } from "typeorm"
import { InjectRepository } from "typeorm-typedi-extensions"
import { DiaryDto, DiaryQueryDto } from "../dtos/diary.dto"
import { Diary } from "../entities/diary.entity"
import HttpException from "../exceptions/http.exception"
import { ICurrentUser } from "../interfaces/currentUser.interface"
import { getRequestContext } from "../utils/asyncStorage"

@Service()
export default class DiaryService {
  constructor(
    @InjectRepository(Diary)
    private readonly diaryRepository: Repository<Diary>
  ) {}

  async getDiaries(user: ICurrentUser, queryDiary: DiaryQueryDto) {
    const qb = await this.diaryRepository
      .createQueryBuilder("diary")
      .leftJoinAndSelect("diary.user", "user")
      .where("user.id = :userId", { userId: user.id })

    const { pageNum = 1, pageSize = 8 } = queryDiary
    qb.limit(pageSize)
    qb.offset(pageSize * (pageNum - 1))

    let diaries = await qb.getMany()
    return diaries
  }

  async createDiary(user: ICurrentUser, diaryData: DiaryDto): Promise<Diary> {
    return await this.diaryRepository.save({ ...diaryData, user: user as any })
  }
}
