import { ActivityStatus } from '@/CONST/activityStatus'
import { BaseType } from './base'
import { UserType } from './user'

export type Weekdays =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'

export type Schedule = {
  [key in Weekdays]: ScheduleHours
}
export type ScheduleHour = `${string}:${string}`
export type ScheduleHours = `${ScheduleHour} - ${ScheduleHour}` | '24' | null

export interface ParkActivity extends Partial<BaseType> {
  shortName: string
  name: string
  description: string
  schedule: Schedule
  scheduleAsPark?: boolean
  price: number
  operators?: ActivityOperator[]
  status: ActivityStatus
  recommendations?: string
  requiresInsurance?: boolean
}

export type ActivityOperator = {
  name: UserType['name']
  id: UserType['id']
  schedule: Schedule
}

export type ClientActivity = {
  id: ParkActivity['id']
  price: ParkActivity['price']
  name: ParkActivity['name']
}
