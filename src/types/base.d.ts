import { Timestamp } from 'firebase/firestore'
import { UserType } from './user'

export type BaseType = {
  id: string
  created: {
    at: Date | Timestamp
    by: string
  }
  updated: {
    at: Date | Timestamp
    by: string
  }
  deleted: {
    at: Date | Timestamp
    by: string
    isDeleted: boolean
  }
}
