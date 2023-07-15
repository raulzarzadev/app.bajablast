import { Schedule } from './activities'
import { BaseType } from './base'

export type DTO_ParkConfiguration = {
  name: string
  dollarPrice: number
  schedule: Schedule
  description: string
  selected?: boolean
  address: string
  termsAndConds: string
}

export type ParkConfiguration = DTO_ParkConfiguration & BaseType
