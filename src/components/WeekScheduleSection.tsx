'use client'
import { Container } from '@mui/material'
import { useState } from 'react'
import WeekSchedule from './WeekSchedule'
import ScheduleForm from './ScheduleForm'
import { Schedule } from '@/types/activities'
import useUser from '@/hooks/useUser'

const WeekScheduleSection = ({
  schedule,
  setSchedule
}: {
  schedule?: Schedule
  setSchedule?: (newSchedule: Schedule) => void
}) => {
  const [editing, setEditing] = useState(false)
  return (
    <div>
      {editing ? (
        <ScheduleForm
          schedule={schedule}
          onSubmit={(e) => {
            setSchedule?.(e)
            setEditing(false)
          }}
        />
      ) : (
        <WeekSchedule onEdit={() => setEditing(true)} schedule={schedule} />
      )}
    </div>
  )
}

export default WeekScheduleSection
