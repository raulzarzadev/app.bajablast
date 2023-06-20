import { BaseType } from './base'

export type Weekdays =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'
export type Schedule = {
  [key in Weekdays]: `${number}:${number}-${number}:${number}` | '24' | null
}
export interface ParkActivity extends Partial<BaseType> {
  shortName: string
  name: string
  description: string
  schedule: Schedule
  price: number
}

export type ClientActivity = {
  price: number
  name: string
}
