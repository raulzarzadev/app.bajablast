import { Schedule, Weekdays } from '@/types/activities'
import { Box, IconButton, Typography } from '@mui/material'
import AppIcon from './AppIcon'
import { format, getDay } from 'date-fns'
import { WEEK_DAYS } from '@/CONST/dateLabels'
import useUser from '@/hooks/useUser'
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
  const { user } = useUser()
  const isFocused = (day: string) => {
    const todayDay = format(new Date(), 'EEEE')
    return todayDay === day
  }
  const canEdit = user?.rol === 'COORDINATOR' || user?.isAdmin
  return (
    <Box>
      <Box className="flex justify-center w-full items-center">
        <Typography className="text-center">Horario</Typography>
        {onEdit && canEdit && (
          <IconButton onClick={() => onEdit()}>
            <AppIcon icon="edit" />
          </IconButton>
        )}
      </Box>
      <Box className="flex justify-center">
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
                  variant={`${isFocused(day) ? 'h5' : 'h6'}`}
                  className={`text-center  ${isFocused(day) && ' font-bold '}`}
                >
                  {WEEK_DAYS[day]}
                </Typography>
                <div className="flex flex-col text-center my-4">
                  {schedule?.[day]
                    ?.split('-')
                    .map((h) => <span key={h}>{h}</span>) || 'Cerrado'}
                </div>
              </Box>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}

export default WeekSchedule
