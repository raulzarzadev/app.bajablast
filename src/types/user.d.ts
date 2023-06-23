import { BloodType } from '@/CONST/bloodTypes'
import { ClientActivity } from './activities'
import { BaseType } from './base'
import { roles } from '@/CONST/user'

export type Rol = (typeof roles)[number]['key']
export interface UserType extends Partial<BaseType> {
  name: string
  email: string
  phone: string
  birthday: Date
  rol: Rol
  emergencyPhone: string
  bloodType: BloodType
  medicalInfo: string
  image: string
  isAdmin?: boolean
}

export interface Friend extends Partial<UserType> {
  activity?: ClientActivity
  id?: string
}

export interface NewClient extends UserType {
  termsAccepted?: boolean
  medicalInfoUpdated?: boolean
  activity?: ClientActivity
  signature?: string | null
  friends?: Friend[]
  payment?: Payment
}
export type PaymentMethod = 'cash' | 'card'

export type Payment = {
  method: PaymentMethod
  date: Date
  amount: number
  created: {
    at: Date
    by: UserType['id']
  }
}
