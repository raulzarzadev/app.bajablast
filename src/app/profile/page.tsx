'use client'
import { USER_ROL } from '@/CONST/user'
import ClientOptions from '@/components/ClientOptions'
import CollaboratorOptions from '@/components/CollaboratorOptions'
import CoordinatorOptions from '@/components/CoordinatorOptions'
import UserCard from '@/components/UserCard'
import { UserContext } from '@/context/user'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
const Profile = () => {
  const { user } = useContext(UserContext)
  const router = useRouter()
  const handleEdit = () => {
    router.push('profile/edit')
  }
  return (
    <main className="flex min-h-screen flex-col items-center p-12 gap-12">
      {user && (
        <UserCard
          user={user}
          onEdit={() => {
            handleEdit()
          }}
        />
      )}
      {(user?.isAdmin || user?.rol === USER_ROL.CLIENT) && <ClientOptions />}
      {(user?.isAdmin || user?.rol === USER_ROL.COLLABORATOR) && (
        <CollaboratorOptions />
      )}
      {(user?.isAdmin || user?.rol === USER_ROL.COORDINATOR) && (
        <CoordinatorOptions />
      )}
    </main>
  )
}

export default Profile
