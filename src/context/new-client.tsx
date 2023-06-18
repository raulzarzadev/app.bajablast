import { UserType } from '@/types/user'
import { ReactNode, createContext, useState } from 'react'

export type Activity = {
  price: number
  name: string
}

export interface Friend extends Partial<UserType> {
  activity?: Activity
  id?: string
}
export interface NewClient extends UserType {
  termsAccepted?: boolean
  medicalInfoUpdated?: boolean
  activity?: Activity
  signature?: string
}

export const NewClientContext = createContext<{
  client?: Partial<NewClient>
  setClient?: (newClient: object) => void
  friends?: Friend[]
  setFriends?: (fiends: any) => void
}>({})

export function NewClientProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState({})
  const [friends, setFriends] = useState([])
  return (
    <NewClientContext.Provider
      value={{
        client,
        setClient,
        friends,
        setFriends
      }}
    >
      {children}
    </NewClientContext.Provider>
  )
}
