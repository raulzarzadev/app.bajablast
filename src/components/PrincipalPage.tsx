'use client'

import { UserContext } from '@/context/user'
import { useContext } from 'react'
import LandingPage from './LandingPage'
import UserHome from './UserHome'

const PrincipalPage = () => {
  const { user } = useContext(UserContext)
  if (!user) return <LandingPage />
  return <UserHome />
}

export default PrincipalPage
