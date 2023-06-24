import { Schedule } from '@/types/activities'
import { Box } from '@mui/material'

const WeekSchedule = ({ schedule }: { schedule: Schedule }) => {
  return (
    <Box className="flex w-full justify-between items-center flex-col  gap-4 sm:flex-row sm:items-stretch">
      {Object?.entries(schedule || {}).map(([key, value]) => {
        return (
          <Box key={key} className="flex flex-col text-center">
            <span>{key}</span>
            <div className="flex flex-col">
              {value?.split('-').map((h) => <span key={h}>{h}</span>) ||
                'Cerrado'}
            </div>
          </Box>
        )
      })}
    </Box>
  )
}

export default WeekSchedule
