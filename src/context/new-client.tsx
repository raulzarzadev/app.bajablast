import { ReactNode, createContext, useState } from 'react'

export const NewClientContext = createContext<{
  client?: object
  setClient?: (newClient: object) => void
  activities?: object
  setActivities?: (newActivities: object) => void
  friends?: Array<object>
  setFriends?: (fiends: any) => void
}>({})

export function NewClientProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState({})
  const [activities, setActivities] = useState({})
  const [friends, setFriends] = useState([])
  return (
    <NewClientContext.Provider
      value={{
        client,
        setClient,
        activities,
        setActivities,
        friends,
        setFriends
      }}
    >
      {children}
    </NewClientContext.Provider>
  )
}
