import { Timestamp } from 'firebase/firestore'
import { format as fnsFormat } from 'date-fns'
import { es } from 'date-fns/locale'

export const dateMx = (date?: Date | Timestamp) => {
  const value = date instanceof Timestamp ? date.toDate() : date
  return new Intl.DateTimeFormat(['es-Mx']).format(value)
}

export const dateFormat = (
  date: number | Date | Timestamp,
  strFormat: string
): string => {
  const value = date instanceof Timestamp ? date.toDate() : date
  const res = fnsFormat(value, strFormat, {
    locale: es
  })
  return res
}
