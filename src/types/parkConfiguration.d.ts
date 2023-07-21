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
  checkMedicalConditions?: string[]
  insurancePolicyCount?: number
  usersCount?: number
}

export type ParkConfiguration = DTO_ParkConfiguration & BaseType
