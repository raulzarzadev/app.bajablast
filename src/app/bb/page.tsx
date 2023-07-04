'use client'

import { USER_ROL } from '@/CONST/user'
import ParkActivities from '@/components/ParkActivities'
import ParkAreas from '@/components/ParkAreas'
import useUser from '@/hooks/useUser'

const BB = () => {
  const { user } = useUser()
  return (
    <div className="flex flex-col items-center justify-center">
      <ParkActivities />
      {[USER_ROL.COLLABORATOR, USER_ROL.COORDINATOR].includes(
        user?.rol as USER_ROL
      ) && <ParkAreas />}
    </div>
  )
}

export default BB
