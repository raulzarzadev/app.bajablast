import { activities } from '@/CONST/fake-activities'
import { Box, Button, Container, Typography } from '@mui/material'
import Link from 'next/link'

const ParkActivities = ({
  onClickActivity
}: {
  onClickActivity?: (activityName: string) => void
}) => {
  return (
    <Container component={'section'} className="max-w-md mx-auto">
      <Typography variant="h6">Actividades</Typography>
      <Box
        component={'div'}
        className="grid grid-cols-2 sm:grid-cols-3 gap-2 place-content-center  "
      >
        {activities.map((activity) => (
          <Link
            onClick={(e) => {
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
                ${activity.price.toFixed(2)}
              </Typography>
            </Box>
          </Link>
        ))}
      </Box>
    </Container>
  )
}

export default ParkActivities
