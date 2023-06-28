import {
  ActivityOperator,
  ParkActivity,
  ScheduleHours
} from '@/types/activities'
import { weekDays } from '@/utils/utils-date'
import { Box, Typography } from '@mui/material'
import { useState } from 'react'

type Schedule = ParkActivity['schedule'] | ActivityOperator['schedule']

const ScheduleForm = ({
  schedule,
  onSubmit
}: {
  schedule?: Schedule
  onSubmit?: (schedule: Schedule) => void
}) => {
  return (
    <div>
      <Typography>Horario</Typography>
      {Object.entries(schedule).map((day) => (
        <DaySchedule key={day} day={day} />
      ))}
    </div>
  )
}

const DaySchedule = ({ day }: { day }) => {
  const [schedule, setSchedule] = useState<ScheduleHours>(null)
  const [showScheduleForm, setShowScheduleForm] = useState<ScheduleHours>()
  return (
    <div className="flex">
      <div>{day}</div>
      <button>{}</button>
    </div>
  )
}

export default ScheduleForm
