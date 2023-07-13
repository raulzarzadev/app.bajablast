'use client'
import { Box, Container, Typography } from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ParkActivity } from '@/types/activities'
import { listenActivities, listenActivity } from '@/firebase/activities'
import CurrencySpan from './CurrencySpan'
import AppIcon from './AppIcon'
import useUser from '@/hooks/useUser'
import { ACTIVITY_STATUS } from '@/CONST/activityStatus'
import { USER_ROL } from '@/CONST/user'

const ParkActivities = ({
  onClickActivity
}: {
  onClickActivity?: (activityName: string) => void
}) => {
  const { user } = useUser()
  const [activities, setActivities] = useState<ParkActivity[]>([])
  useEffect(() => {
    listenActivities((res: ParkActivity[]) => setActivities(res))
  }, [])
  const canCreteNewActivity = user?.isAdmin
  return (
    <Container component={'section'} className="max-w-2xl mx-auto">
      <Typography variant="h6">Actividades</Typography>
      <Box
        component={'div'}
        className="grid  sm:grid-cols-3 gap-2 sm:place-content-center "
      >
        {activities.map((activity) => (
          <Link
            passHref
            onClick={() => {
              onClickActivity?.(activity?.id || activity.shortName)
            }}
            href={`/bb/${activity.id}`}
            key={activity.name}
            className={`p-0 mx-auto 
            ${
              activity.status === 'HIDDEN' &&
              !(user?.isAdmin || user?.rol === USER_ROL.COORDINATOR) &&
              'hidden'
            }
            ${activity.status === 'CLOSED' && 'opacity-40'}
            bg-pink-400 
            rounded-md 
            shadow-md
            w-full 
            sm:w-[190px]
            sm:aspect-video
            h-full
             `}
          >
            <Box
              component={'article'}
              className="flex flex-col gap-2 items-center justify-between py-4 px-1 text-center  text-white w-full  "
            >
              <Typography component={'p'} variant="h5">
                {activity.name}
              </Typography>
              {activity.status === 'OPEN' ? (
                <>
                  <Typography component={'p'} variant="h5">
                    <CurrencySpan quantity={activity.price} />
                  </Typography>
                  {user?.isAdmin && (
                    <Typography>
                      {ACTIVITY_STATUS[activity.status || 'UPCOMING']?.label}
                    </Typography>
                  )}
                </>
              ) : (
                <>
                  {user?.isAdmin && (
                    <Typography component={'p'} variant="h5">
                      <CurrencySpan quantity={activity.price} />
                    </Typography>
                  )}
                  <Typography>
                    {ACTIVITY_STATUS[activity.status || 'UPCOMING']?.label}
                  </Typography>
                </>
              )}
            </Box>
          </Link>
        ))}
        {canCreteNewActivity && (
          <Link
            passHref
            href={`/bb/new`}
            className="p-0 mx-auto flex items-center"
          >
            <Box
              component={'article'}
              className="flex flex-col gap-2 items-center justify-between py-4 px-1 text-center bg-slate-200 w-[120px] aspect-square rounded-md shadow-md "
            >
              <Typography component={'p'}>Nueva</Typography>
              <AppIcon icon="add" />
            </Box>
          </Link>
        )}
      </Box>
    </Container>
  )
}

export default ParkActivities
