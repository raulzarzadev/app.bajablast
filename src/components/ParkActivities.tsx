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
import BasicSquare from './BasicSquare'
export type ParkActivitiesPage = Partial<ParkActivity>[] | undefined

const ParkActivities = ({
  activities: defaultActivities,
  onClickActivity
}: {
  activities?: ParkActivitiesPage
  onClickActivity?: (activityName: string) => void
}) => {
  const { user } = useUser()
  const [activities, setActivities] = useState<ParkActivitiesPage>([])
  useEffect(() => {
    if (defaultActivities) {
      setActivities(defaultActivities)
    } else {
      listenActivities((res: ParkActivity[]) => setActivities(res))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          >
            <BasicSquare
              title={activity.name}
              content={
                activity.status === 'OPEN' ? (
                  <CurrencySpan quantity={activity.price} className="text-xl" />
                ) : (
                  <span className="text-red-500">Cerrado</span>
                )
              }
              helperText={ACTIVITY_STATUS[activity.status || 'UPCOMING']?.label}
            />
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
