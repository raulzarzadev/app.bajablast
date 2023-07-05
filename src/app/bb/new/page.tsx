'use client'
import withAuth from '@/HOCs/withAuth'
import ActivityForm from '@/components/ActivityForm'
import { createActivity } from '@/firebase/activities'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

const NewActivity = () => {
  const router = useRouter()
  const onSubmit = async (data: any) => {
    try {
      await createActivity({ ...data }).then((res) => console.log(res))
      router.push('/bb')
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

export default withAuth(NewActivity, ['ADMIN', 'COORDINATOR'])
