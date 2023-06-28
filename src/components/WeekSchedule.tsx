import { Schedule } from '@/types/activities'
import { Box, IconButton, Typography } from '@mui/material'
import AppIcon from './AppIcon'
import { format, getDay } from 'date-fns'
import { dateFormat } from '@/utils/utils-date'
import { WEEK_DAYS } from '@/CONST/dateLabels'

const WeekSchedule = ({
  schedule,
  onEdit
}: {
  schedule?: Schedule
  onEdit?: () => void
}) => {
  const isFocused = (day) => {
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
      <Box className="flex w-full justify-between items-center flex-col  gap-4 sm:flex-row sm:items-stretch">
        {Object?.entries(schedule || {}).map(([key, value]) => {
          return (
            <Box
              key={key}
              className={`flex flex-col text-center ${
                isFocused(key) && ' font-bold '
              }`}
            >
              <span>{WEEK_DAYS[key]}</span>
              <div className="flex flex-col">
                {value?.split('-').map((h) => <span key={h}>{h}</span>) ||
                  'Cerrado'}
              </div>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default WeekSchedule
