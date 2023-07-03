'use client'
import useUser from '@/hooks/useUser'
import { ParkActivity, Schedule } from '@/types/activities'
import { Box, Container, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import ActivityAdmin from './ActivityAdmin'
import { listenActivity, updateActivity } from '@/firebase/activities'
import WeekScheduleSection from './WeekScheduleSection'

const ActivityPage = ({ activityId }: { activityId: ParkActivity['id'] }) => {
  const [activity, setActivity] = useState<ParkActivity | undefined>()

  const { user } = useUser()
  useEffect(() => {
    //const find = activities.find(({ id }) => id === activityId)
    if (activityId)
      listenActivity(activityId, (res: ParkActivity | undefined) =>
        setActivity(res)
      )
  }, [activityId])
  const handleUpdateSchedule = async (newSchedule: Schedule) => {
    if (!activityId) return console.error('no activity id')
    try {
      const res = await updateActivity(activityId, { schedule: newSchedule })
      console.log({ res })
    } catch (error) {
      console.error(error)
    }
  }
  if (activity === undefined) return <>Loading...</>
  return (
    <>
      <Container>
        <Typography variant="h4" className="text-center">
          {activity?.name}
        </Typography>
        <Typography
          variant="body1"
          className="py-4 text-center"
          component={'p'}
        >
          {activity?.description}
        </Typography>
      </Container>

      <Container component={'section'}>
        <WeekScheduleSection
          schedule={activity.schedule}
          setSchedule={(newSchedule) => handleUpdateSchedule(newSchedule)}
        />
      </Container>

      {/* 
      <Container>
        {['COORDINATOR', 'ADMIN', 'COLLABORATOR'].includes(user?.rol || '') && (
          <ActivityCollaboratorsSchedule collaborators={activity?.operators} />
        )}
      </Container>
         */}

      <Container>
        {['COORDINATOR', 'ADMIN'].includes(user?.rol || '') && (
          <ActivityAdmin activity={activity} />
        )}
      </Container>
    </>
  )
}

export default ActivityPage
