import { activities } from '@/CONST/fake-activities'
import { Box, Button, Container, Typography } from '@mui/material'
import Link from 'next/link'

const ParkActivities = ({
  onClickActivity
}: {
  onClickActivity: (activityId: string) => void
}) => {
  return (
    <Container component={'section'} className="">
      <Box component={'div'} className="flex gap-2 flex-wrap justify-center">
        {activities.map((activity) => (
          <Button
            onClick={(e) => {
              e.preventDefault()
              onClickActivity(activity.activityId)
            }}
            key={activity.name}
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
          </Button>
        ))}
      </Box>
    </Container>
  )
}

export default ParkActivities
