import { CollaboratorsContext } from '@/context/collaborators'
import { listenCollaborators } from '@/firebase/users'
import { UserType } from '@/types/user'
import { useContext, useEffect } from 'react'

const useCollaborators = () => {
  const { collaborators } = useContext(CollaboratorsContext)
  return { collaborators }
}

export default useCollaborators
