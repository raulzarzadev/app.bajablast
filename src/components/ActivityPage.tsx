'use client'
import { activities } from '@/CONST/fake-activities'
import useUser from '@/hooks/useUser'
import { ParkActivity } from '@/types/activities'
import { Box, Container, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import ActivityAdmin from './ActivityAdmin'
import ActivityCollaboratorsSchedule from './ActivityCollaboratorsSchedule'

const ActivityPage = ({ activityId }: { activityId: ParkActivity['id'] }) => {
  const [activity, setActivity] = useState<ParkActivity | undefined>()
  const { user } = useUser()
  useEffect(() => {
    const find = activities.find(({ id }) => id === activityId)
    setActivity(find)
  }, [activityId])
  return (
    <>
      <Container>
        <Box>
          <Typography variant="h4">{activity?.name}</Typography>
          <Typography variant="body1" className="py-4" component={'p'}>
            {activity?.description}
          </Typography>
          <Box className="flex w-full justify-between items-center flex-col  gap-4 sm:flex-row sm:items-stretch">
            {Object?.entries(activity?.schedule || {}).map(([key, value]) => {
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
        </Box>
      </Container>
      <Container>
        {['COORDINATOR', 'ADMIN', 'COLLABORATOR'].includes(user?.rol || '') && (
          <ActivityCollaboratorsSchedule />
        )}
      </Container>

      <Container>
        {['COORDINATOR', 'ADMIN'].includes(user?.rol || '') && (
          <ActivityAdmin />
        )}
      </Container>
    </>
  )
}

export default ActivityPage
