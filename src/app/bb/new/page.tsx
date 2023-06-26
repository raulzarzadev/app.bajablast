'use client'
import ActivityForm from '@/components/ActivityForm'
import { createActivity } from '@/firebase/activities'
import { Box, Typography } from '@mui/material'

const NewActivity = () => {
  const onSubmit = async (data: any) => {
    try {
      await createActivity({ ...data }).then((res) => console.log(res))
    } catch (error) {
      console.error({ error })
    }
  }
  return (
    <Box className="max-w-md mx-auto">
      <Typography variant="h5" className="text-center my-4">
        Nueva actividad
      </Typography>
      <ActivityForm
        onSubmit={async (activity) => {
          await onSubmit(activity)
        }}
      />
    </Box>
  )
}

export default NewActivity
