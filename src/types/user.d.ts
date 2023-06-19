import { BloodType } from '@/CONST/bloodTypes'
import { ClientActivity } from './activities'

export type UserType = {
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
export interface NewClient extends UserType {
  termsAccepted?: boolean
  medicalInfoUpdated?: boolean
  activity?: ClientActivity
  signature?: string | null
}
