import { Schedule } from './activities'
import { BaseType } from './base'

export type DTO_ParkConfiguration = {
  name: string
  dollarPrice: number
  schedule: Schedule
  description: string
  selected?: boolean
}

export type ParkConfiguration = DTO_ParkConfiguration & BaseType
