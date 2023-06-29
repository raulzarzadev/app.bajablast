import {
  Schedule,
  ScheduleHour,
  ScheduleHours,
  Weekdays
} from '@/types/activities'
import { Box, Button, IconButton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import TimePicker from './InputTimeRange'
import AppIcon from './AppIcon'
import { WEEK_DAYS } from '@/CONST/dateLabels'

const ScheduleForm = ({
  onSubmit,
  schedule
}: {
  schedule?: Schedule
  onSubmit?: (schedule: Schedule) => void
}) => {
  const [_schedule, _setSchedule] = useState<Schedule>(
    schedule || {
      Monday: null,
      Tuesday: null,
      Wednesday: null,
      Thursday: null,
      Friday: null,
      Saturday: null,
      Sunday: null
    }
  )

  const handleChange = (day: string, time: string | null) => {
    _setSchedule({ ..._schedule, [day]: time })
  }
  const _onSubmit = () => {
    onSubmit?.(_schedule)
  }
  return (
    <div>
      <Typography>Horario</Typography>
      {Object.entries(WEEK_DAYS).map(([key, value]) => (
        <DaySchedule
          key={key}
          day={value}
          value={_schedule[key as Weekdays]}
          onChange={(day, time) => {
            handleChange(key, time)
          }}
        />
      ))}
      <Box className="flex w-full justify-center">
        <Button
          variant="outlined"
          onClick={(e) => {
            e.preventDefault()
            _onSubmit()
          }}
        >
          Guardar
        </Button>
      </Box>
    </div>
  )
}

const DaySchedule = ({
  day,
  onChange,
  value
}: {
  value?: ScheduleHours
  day: string
  onChange: (day: string, schedule: ScheduleHours) => void
}) => {
  const [startAt, setStartAt] = useState<ScheduleHour>(
    (value?.split('-')[0] as ScheduleHour) || '00:00'
  )
  const [finishAt, setFinishAt] = useState<ScheduleHour>(
    (value?.split('-')[1] as ScheduleHour) || '00:00'
  )
  const [showSchedule, setShowSchedule] = useState(value || false)
  useEffect(() => {
    if (showSchedule) {
      onChange(day, `${startAt} - ${finishAt}`)
    } else {
      onChange(day, null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startAt, finishAt, day, showSchedule])

  const fromValue = new Date().setHours(
    parseInt(startAt.split(':')[0]),
    parseInt(startAt.split(':')[1]),
    0
  )
  const sinceValue = new Date().setHours(
    parseInt(finishAt.split(':')[0]),
    parseInt(finishAt.split(':')[1]),
    0
  )
  return (
    <div className="grid grid-cols-4 gap-4 place-items-center m-4">
      <Typography className="w-full text-end">{day}: </Typography>
      {showSchedule ? (
        <>
          <TimePicker
            // FIXME: what type is value
            // @ts-ignore
            value={fromValue}
            label="Desde: "
            onChange={(time) => {
              setStartAt(time as ScheduleHour)
            }}
          />
          <TimePicker
            // FIXME: what type is value
            // @ts-ignore
            value={sinceValue}
            label="Hasta: "
            onChange={(time) => setFinishAt(time as ScheduleHour)}
          />
          <Box>
            <IconButton
              onClick={(e) => {
                e.preventDefault()
                setShowSchedule(false)
              }}
            >
              <AppIcon icon="close" />
            </IconButton>
          </Box>
        </>
      ) : (
        <>
          <div>Cerrado</div>
          <IconButton
            onClick={(e) => {
              setShowSchedule(true)
            }}
          >
            <AppIcon icon="add" />
          </IconButton>
        </>
      )}
    </div>
  )
}

export default ScheduleForm