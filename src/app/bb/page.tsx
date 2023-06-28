'use client'

import ParkActivities from '@/components/ParkActivities'
import ParkAreas from '@/components/ParkAreas'
import useUser from '@/hooks/useUser'

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
