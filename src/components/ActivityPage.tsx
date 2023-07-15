'use client'
import useUser from '@/hooks/useUser'
import { ParkActivity, Schedule } from '@/types/activities'
import { Container, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import ActivityAdmin from './ActivityAdmin'
import { listenActivity, updateActivity } from '@/firebase/activities'
import { ACTIVITY_STATUS } from '@/CONST/activityStatus'
import { USER_ROL } from '@/CONST/user'
import WeekSchedule from './WeekSchedule'
import useParkConfig from '@/hooks/useParkConfig'

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
  const { parkConfig } = useParkConfig()
  const parkSchedule = parkConfig?.schedule
  if (activity === undefined) return <>Loading...</>
  const activitySchedule = activity.scheduleAsPark
    ? parkSchedule
    : activity.schedule
  return (
    <>
      <div>
        <Typography variant="h4" className="text-center">
          {activity?.name}
        </Typography>
        <Typography variant="h6" className="text-center ">
          {ACTIVITY_STATUS[activity?.status]?.label}
        </Typography>
        <Typography
          variant="body1"
          className="py-4 text-center"
          component={'p'}
        >
          {activity?.description}
        </Typography>
      </div>

      <Container component={'section'}>
        <WeekSchedule schedule={activitySchedule} />
      </Container>

      {/* 
      <Container>
        {['COORDINATOR', 'ADMIN', 'COLLABORATOR'].includes(user?.rol || '') && (
          <ActivityCollaboratorsSchedule collaborators={activity?.operators} />
        )}
      </Container>
         */}

      <Container>
        {[USER_ROL.COORDINATOR].includes(user?.rol as USER_ROL) && (
          <ActivityAdmin activity={activity} />
        )}
      </Container>
    </>
  )
}

export default ActivityPage
