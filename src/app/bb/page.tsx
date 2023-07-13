'use client'

import ParkActivities from '@/components/ParkActivities'
import useUser from '@/hooks/useUser'

const BB = () => {
  const { user } = useUser()
  return (
    <div className="flex flex-col items-center justify-center">
      <ParkActivities />
    </div>
  )
}

export default BB
