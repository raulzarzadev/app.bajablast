'use client'

import ParkActivities from '@/components/ParkActivities'
import ParkAreas from '@/components/ParkAreas'
import UserCard from '@/components/UserCard'
import useUser from '@/hooks/useUser'
import { Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

const BB = () => {
  const { user } = useUser()
  const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center">
      <Typography variant="h4" component={'h4'}>
        BB
      </Typography>

      {/* <UserCard /> */}

      {/* <ParkActivities /> */}
      <ParkActivities
        onClickActivity={(activityName) => {
          router.push(`/bb/${activityName}`)
        }}
      />
      {['COLLABORATOR', 'COORDINATOR'].includes(user?.rol || '') && (
        <ParkAreas />
      )}
    </div>
  )
}

export default BB
