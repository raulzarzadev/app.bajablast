import { ScheduleHour } from '@/types/activities'
import {
  TimePicker as TimePickerMUI,
  TimePickerProps
} from '@mui/x-date-pickers/TimePicker'
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers'

export default function TimePicker<C extends React.ElementType>({
  label = 'Hora',
  onChange,
  ...rest
}: TimePickerProps<C> & {
  label: string
  onChange: (time: ScheduleHour) => void
}) {
  return (
    <TimePickerMUI
      onChange={(props: any) => {
        const hours = `00${props?.getHours()}`.slice(-2)
        const minutes = `00${props?.getMinutes()}`.slice(-2)
        onChange(`${hours}:${minutes}`)
      }}
      label={label}
      viewRenderers={{
        hours: renderTimeViewClock,
        minutes: renderTimeViewClock
      }}
      minutesStep={5}
      ampm={false}
      {...rest}
    />
  )
}
