import dayjs from "dayjs"
import { Service } from "typedi"
import { LessThanOrEqual, Repository } from "typeorm"
import { InjectRepository } from "typeorm-typedi-extensions"
import { RecordDto } from "../dtos/record.dto"
import { Record } from "../entities/record.entity"
import HttpException from "../exceptions/http.exception"
import { ICurrentUser } from "../interfaces/currentUser.interface"
import {
  IDateRange,
  IRecord,
  RecordUnitFilter,
} from "../interfaces/record.interface"

@Service()
export default class RecordService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>
  ) {}

  async getRecords(
    user: ICurrentUser,
    timeType: RecordUnitFilter = RecordUnitFilter.month
  ) {
    const qb = await this.recordRepository
      .createQueryBuilder("record")
      .leftJoinAndSelect("record.user", "user")
      .where("user.id = :userId", { userId: user.id })

    let totalSubUnitTime = 1
    let timeTypeUnit = timeType
    if (timeType === RecordUnitFilter.week) {
      totalSubUnitTime = 7
      timeTypeUnit = RecordUnitFilter.day
    }

    const { startTime, endTime } = this.generateRangeTime(1, timeTypeUnit)

    qb.andWhere("record.time > :startTime", { startTime }).andWhere(
      "record.time < :endTime",
      { endTime }
    )

    let records = await qb.getMany()

    const listUnitTime = this.generateUnitTime(timeTypeUnit)

    const recordMap = this.generateListRecord(records, timeTypeUnit)

    const recordsFilted = listUnitTime.map((unit) => {
      let unitTime = {}
      const recordUnit = recordMap.get(unit)
      if (recordUnit) {
        const { weight, weightTotalRecord, fatPercent, fatTotalRecord } =
          recordUnit
        unitTime = {
          weight: weight / weightTotalRecord,
          fatPercent: fatPercent / fatTotalRecord,
        }
      } else {
        unitTime = {
          weight: 0,
          fatPercent: 0,
        }
      }

      return {
        ...unitTime,
        unit,
      }
    })

    return recordsFilted
  }

  async createRecord(
    user: ICurrentUser,
    recordData: RecordDto
  ): Promise<Record> {
    // can not create record in 1 hour : Dont

    const currentDate = recordData.time || dayjs().format("YYYYMMDDHHmm")

    return await this.recordRepository.save({
      ...recordData,
      time: currentDate,
      user: user as any,
    })
  }

  // return array like [ 1, 2, 3, ... 29, 30 ] for month or [ 1, 2, .... , 23] for day, and sort by current time
  generateUnitTime(unit: RecordUnitFilter): number[] {
    let unitTimes: number[] = []
    switch (unit) {
      case RecordUnitFilter.day:
        unitTimes = Array.from(Array(24).keys())
        break
      case RecordUnitFilter.week:
        unitTimes = Array.from(Array(7).keys()).map((val) => val + 1)
        break
      case RecordUnitFilter.month:
        unitTimes = Array.from(Array(31).keys()).map((val) => val + 1)
    }

    // split
    const currentTime = dayjs("YYYYMMDDHHmm").toDate()
    const currentUnit = this.getRecordUnitTime(unit, currentTime)
    var indexToSplit = unitTimes.indexOf(currentUnit)
    var first = unitTimes.slice(0, indexToSplit + 1)
    var second = unitTimes.slice(indexToSplit + 1)

    return [...second, ...first]
  }

  getRecordUnitTime(unit: RecordUnitFilter, recordTime: Date) {
    switch (unit) {
      case RecordUnitFilter.day:
        return dayjs(recordTime).hour()
      case RecordUnitFilter.week:
        return dayjs(recordTime).day()
      case RecordUnitFilter.month:
        return dayjs(recordTime).month()
      case RecordUnitFilter.year:
        return dayjs(recordTime).year()
      default:
        return 0
    }
  }

  // group record by unit time
  generateListRecord(records: Record[], unit: RecordUnitFilter) {
    const recordMap = new Map<number, IRecord>()

    records.forEach((record) => {
      const hour = this.getRecordUnitTime(unit, record.time)
      // const hour = dayjs(record.time).hour()

      const { fatPercent, weight } = record
      const recordBy = recordMap.get(hour)
      if (!recordBy) {
        recordMap.set(hour, {
          fatPercent: fatPercent || 0,
          weight: weight || 0,
          fatTotalRecord: 1,
          weightTotalRecord: 1,
        })
      } else {
        if (fatPercent) {
          recordBy.fatPercent = recordBy.fatPercent + fatPercent
          recordBy.fatTotalRecord += 1
        }
        if (weight) {
          recordBy.weight = recordBy.weight + weight
          recordBy.weightTotalRecord += 1
        }
        recordMap.set(hour, recordBy)
      }
    })

    return recordMap
  }

  generateRangeTime(timeRange: number, unit: dayjs.ManipulateType): IDateRange {
    const startTime = dayjs().subtract(timeRange, unit).format("YYYYMMDDHHmm")
    const endTime = dayjs().format("YYYYMMDDHHmm")
    return {
      startTime,
      endTime,
    }
  }
}
