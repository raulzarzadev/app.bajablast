'use client'
import ClientOptions from '@/components/ClientOptions'
import CollaboratorOptions from '@/components/CollaboratorOptions'
import CoordinatorOptions from '@/components/CoordinatorOptions'
import UserCard from '@/components/UserCard'
import { UserContext } from '@/context/user'
import { useContext, useEffect } from 'react'

const Profile = () => {
  const { user } = useContext(UserContext)

  return (
    <main className="flex min-h-screen flex-col items-center p-12 gap-12">
      <UserCard />
      {(user?.isAdmin || user?.rol === 'CLIENT') && <ClientOptions />}
      {(user?.isAdmin || user?.rol === 'COLLABORATOR') && (
        <CollaboratorOptions />
      )}
      {(user?.isAdmin || user?.rol === 'COORDINATOR') && <CoordinatorOptions />}
    </main>
  )
}

export default Profile
