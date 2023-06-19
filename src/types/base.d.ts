import { UserType } from './user'

export type BaseType = {
  id: string
  created: {
    at: Date
    by: string
  }
  updated: {
    at: Date
    by: string
  }
  deleted: {
    at: Date
    by: string
    isDeleted: boolean
  }
}
