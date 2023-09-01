'use client'

import { UserContext } from '@/context/user'
import { useContext } from 'react'
import UserSection from './UserSection'

const PrincipalPage = () => {
  const { user } = useContext(UserContext)
  return (
    <>
      {user && (
        <>
          <UserSection user={user} />
        </>
      )}
    </>
  )
}

export default PrincipalPage
