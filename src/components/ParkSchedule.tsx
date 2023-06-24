'use client'
import { Box, Typography } from '@mui/material'
import WeekSchedule from './WeekSchedule'

const ParkSchedule = () => {
  return (
    <>
      <Typography variant="h5">Horario</Typography>
      <Box>
        <WeekSchedule
          schedule={{
            Monday: null,
            Tuesday: '12:00-22:00',
            Wednesday: '12:00-22:00',
            Thursday: '12:00-22:00',
            Friday: '12:00-22:00',
            Saturday: '12:00-22:00',
            Sunday: '12:00-22:00'
          }}
        />
      </Box>
    </>
  )
}

export default ParkSchedule
