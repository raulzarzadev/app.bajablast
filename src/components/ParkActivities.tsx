import { activities } from '@/CONST/fake-activities'
import { Box, Button, Container, Typography } from '@mui/material'

const ParkActivities = ({
  onClickActivity
}: {
  onClickActivity?: (activityName: string) => void
}) => {
  return (
    <Container component={'section'} className="max-w-md mx-auto">
      <Typography variant="h6">Actividades</Typography>
      <Box component={'div'} className="flex gap-2 flex-wrap justify-start ">
        {activities.map((activity) => (
          <Button
            onClick={(e) => {
              e.preventDefault()
              onClickActivity?.(activity?.id || activity.shortName)
            }}
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
          </Button>
        ))}
      </Box>
    </Container>
  )
}

export default ParkActivities
