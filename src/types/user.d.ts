import { BloodType } from '@/CONST/bloodTypes'
import { ClientActivity } from './activities'
import { BaseType } from './base'
import { UserRol } from '@/CONST/user'
import { PaymentMethods } from '@/CONST/paymentMethods'
import { Timestamp } from 'firebase/firestore'

export interface UserType extends Partial<BaseType> {
  name: string
  email: string
  phone: string
  birthday: Date | null
  rol: UserRol
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
  discount: number
  dollarPrice: number
  created: {
    at: Date | Timestamp
    by: UserType['id']
  }
}

export interface Client extends NewClient {
  paymentDate?: number | Date | Timestamp | null | undefined
  id: string
}
