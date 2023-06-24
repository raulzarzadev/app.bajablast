'use client'
import { listenCollaborators } from '@/firebase/users'
import { UserType } from '@/types/user'
import { ReactNode, createContext, useEffect, useState } from 'react'

export const CollaboratorsContext = createContext<CollaboratorsContext>({})
export type CollaboratorsContext = {
  collaborators?: UserType[]
  setCollaborators?: (collaborators?: UserType[]) => void
}

export const CollaboratorsContextProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const [collaborators, setCollaborators] = useState<UserType[] | undefined>([])
  useEffect(() => {
    listenCollaborators((res: UserType[] | undefined) => {
      setCollaborators?.(res)
    })
  }, [setCollaborators])
  return (
    <CollaboratorsContext.Provider value={{ collaborators, setCollaborators }}>
      {children}
    </CollaboratorsContext.Provider>
  )
}
