import { Schedule, Weekdays } from '@/types/activities'
import { Box, IconButton, Typography } from '@mui/material'
import AppIcon from './AppIcon'
import { format, getDay } from 'date-fns'
import { WEEK_DAYS } from '@/CONST/dateLabels'
type Days = keyof typeof WEEK_DAYS
const weekDays: Days[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]
const WeekSchedule = ({
  schedule,
  onEdit
}: {
  schedule?: Schedule
  onEdit?: () => void
}) => {
  const isFocused = (day: string) => {
    const todayDay = format(new Date(), 'EEEE')
    return todayDay === day
  }
  return (
    <Box>
      <Box className="flex justify-center w-full items-center">
        <Typography className="text-center">Horario</Typography>
        {onEdit && (
          <IconButton onClick={() => onEdit()}>
            <AppIcon icon="edit" />
          </IconButton>
        )}
      </Box>
      <Box className="flex overflow-x-auto snap-x ">
        {Object.values(weekDays).map((day) => {
          return (
            <Box
              key={day}
              className={`flex flex-col text-center text-xs m-2 snap-center ${
                isFocused(day) && ' font-bold text-xl '
              }`}
            >
              <Typography
                className={`text-center text-xs ${
                  isFocused(day) && ' font-bold text-xl '
                }`}
              >
                {WEEK_DAYS[day]}
              </Typography>
              <div className="flex flex-col text-center">
                {schedule?.[day]
                  ?.split('-')
                  .map((h) => <span key={h}>{h}</span>) || 'Cerrado'}
              </div>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default WeekSchedule
