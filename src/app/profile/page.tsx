'use client'
import ClientOptions from '@/components/ClientOptions'
import CollaboratorOptions from '@/components/CollaboratorOptions'
import CoordinatorOptions from '@/components/CoordinatorOptions'
import UserCard from '@/components/UserCard'
import { UserContext } from '@/context/user'
import { useContext, useEffect } from 'react'

const Profile = () => {
  const { user, setUser } = useContext(UserContext)
  if (user === undefined) {
    setTimeout(() => {
      return setUser(null)
    }, 1000)
    return <span>Loading...</span>
  }
  if (user === null) return <span>Sin usuario</span>
  return (
    <main className="flex min-h-screen flex-col items-center p-12 gap-12">
      <UserCard />
      {user.rol === 'CLIENT' && <ClientOptions />}
      {user.rol === 'COLLABORATOR' && <CollaboratorOptions />}
      {user.rol === 'COORDINATOR' && <CoordinatorOptions />}
    </main>
  )
}

export default Profile
