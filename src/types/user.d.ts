import { BloodType } from '@/CONST/bloodTypes'
import { ClientActivity } from './activities'
import { BaseType } from './base'

export interface UserType extends Partial<BaseType> {
  name: string
  email: string
  phone: string
  birthday: Date
  rol: 'CLIENT' | 'COLLABORATOR' | 'COORDINATOR' | 'ADMIN'
  emergencyPhone: string
  bloodType: BloodType
  medicalInfo: string
}

export interface Friend extends Partial<UserType> {
  activity?: ClientActivity
  id?: string
}

export type PaymentMethod = 'cash' | 'card'
export interface NewClient extends UserType {
  termsAccepted?: boolean
  medicalInfoUpdated?: boolean
  activity?: ClientActivity
  signature?: string | null
  friends?: Friend[]
  payment?: {
    method: PaymentMethod
    date: Date
    amount: number
  }
}
