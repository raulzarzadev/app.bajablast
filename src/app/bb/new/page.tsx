'use client'
import ActivityForm from '@/components/ActivityForm'
import { Box, Typography } from '@mui/material'

const NewActivity = () => {
  return (
    <Box className="max-w-md mx-auto">
      <Typography variant="h5" className="text-center my-4">
        Nueva actividad
      </Typography>
      <ActivityForm
        onSubmit={(activity) => {
          console.log({ activity })
        }}
      />
    </Box>
  )
}

export default NewActivity
