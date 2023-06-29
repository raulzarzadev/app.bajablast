import { BloodType } from '@/CONST/bloodTypes'
import { ClientActivity } from './activities'
import { BaseType } from './base'
import { roles } from '@/CONST/user'
import { PaymentMethods } from '@/CONST/paymentMethods'
import { Timestamp } from 'firebase/firestore'

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
  activity?: ClientActivity | null
  id?: string
}

export interface NewClient extends UserType {
  termsAccepted?: boolean
  medicalInfoUpdated?: boolean
  activity?: ClientActivity | null
  signature?: string | null
  friends?: Friend[]
  payment?: Payment
}

export type Payment = {
  method: PaymentMethods
  date: Date | Timestamp
  amount: number
  created: {
    at: Date | Timestamp
    by: UserType['id']
  }
}

export interface Client extends NewClient {
  id: string
}
