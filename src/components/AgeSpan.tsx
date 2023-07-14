import asDate from '@/utils/asDate'
import { dateFormat } from '@/utils/utils-date'
import { differenceInYears } from 'date-fns'
import { Timestamp } from 'firebase/firestore'

const AgeSpan = ({
  birthday
}: {
  birthday: Date | Timestamp | number | string
}) => {
  const birthdayDate = asDate(birthday)
  if (!birthdayDate) return <span>-</span>
  const age = asDate(birthday) && differenceInYears(new Date(), birthdayDate)
  // const daysUntilBirthday =
  //   asDate(birthday) &&
  //   differenceInDays(
  //     new Date(),
  //     new Date(birthdayDate).setFullYear(new Date().getFullYear())
  //   )
  return (
    <div className="flex flex-col justify-center items-center">
      <span>{age}</span>
      <span>{dateFormat(birthdayDate, 'dd-MMM')}</span>
    </div>
  )
}

export default AgeSpan
