'use client'

import { UserContext } from '@/context/user'
import { useContext } from 'react'
import LandingPage from './LandingPage'
import UserHome from './UserHome'
import ParkActivities from './ParkActivities'
import UserSection from './UserSection'
import UserCard from './UserCard'

const PrincipalPage = () => {
  const { user } = useContext(UserContext)
  return (
    <>
      {user && (
        <>
          <UserSection user={user} />
        </>
      )}
      <ParkActivities />
    </>
  )
}

export default PrincipalPage
