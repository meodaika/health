export interface IRecord {
  fatPercent: number
  fatTotalRecord: number
  weight: number
  weightTotalRecord: number
}

export interface IDateRange {
  startTime: string
  endTime: string
}

export enum RecordUnitFilter {
  day = "day",
  week = "week",
  month = "month",
  year = "year",
}
