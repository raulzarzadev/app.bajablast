'use client'
import { Box, Container, Typography } from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ParkActivity } from '@/types/activities'
import { listenActivities, listenActivity } from '@/firebase/activities'
import CurrencySpan from './CurrencySpan'
import AppIcon from './AppIcon'
const ParkActivities = ({
  onClickActivity
}: {
  onClickActivity?: (activityName: string) => void
}) => {
  const [activities, setActivities] = useState<ParkActivity[]>([])
  useEffect(() => {
    listenActivities((res: ParkActivity[]) => setActivities(res))
  }, [])

  return (
    <Container component={'section'} className="max-w-md mx-auto">
      <Typography variant="h6">Actividades</Typography>
      <Box
        component={'div'}
        className="grid grid-cols-2 sm:grid-cols-3 gap-2 place-content-center  "
      >
        {activities.map((activity) => (
          <Link
            passHref
            onClick={() => {
              onClickActivity?.(activity?.id || activity.shortName)
            }}
            href={`/bb/${activity.id}`}
            key={activity.name}
            className="p-0"
          >
            <Box
              component={'article'}
              className="flex flex-col gap-2 items-center justify-between py-4 px-1 text-center bg-slate-200 w-[120px] aspect-square rounded-md shadow-md "
            >
              <Typography component={'p'}>{activity.name}</Typography>
              <Typography component={'p'}>
                <CurrencySpan quantity={activity.price} />
              </Typography>
            </Box>
          </Link>
        ))}
        <Link passHref href={`/bb/new`} className="p-0">
          <Box
            component={'article'}
            className="flex flex-col gap-2 items-center justify-between py-4 px-1 text-center bg-slate-200 w-[120px] aspect-square rounded-md shadow-md "
          >
            <Typography component={'p'}>Nueva</Typography>
            <AppIcon icon="add" />
          </Box>
        </Link>
      </Box>
    </Container>
  )
}

export default ParkActivities
