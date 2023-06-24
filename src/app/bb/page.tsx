'use client'

import ParkActivities from '@/components/ParkActivities'
import ParkAreas from '@/components/ParkAreas'
import UserCard from '@/components/UserCard'
import useUser from '@/hooks/useUser'
import { Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

const BB = () => {
  const { user } = useUser()
  return (
    <div className="flex flex-col items-center justify-center">
      <ParkActivities />
      {['COLLABORATOR', 'COORDINATOR'].includes(user?.rol || '') && (
        <ParkAreas />
      )}
    </div>
  )
}

export default BB
