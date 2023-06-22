import { Timestamp } from 'firebase/firestore'

export const dateMx = (date?: Date | Timestamp) => {
  const value = date instanceof Timestamp ? date.toDate() : date
  return new Intl.DateTimeFormat(['es-Mx']).format(value)
}
