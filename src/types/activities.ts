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
export type ParkActivities = {
  name: string
  description: string
  activityId: string
  schedule: Schedule[]
  price: number
}
