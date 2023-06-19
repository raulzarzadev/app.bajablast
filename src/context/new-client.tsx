import { Friend, NewClient } from '@/types/user'
import { ReactNode, createContext, useState } from 'react'

export const NewClientContext = createContext<{
  client?: NewClient
  setClient?: (newClient?: NewClient) => void
  friends?: Friend[]
  setFriends?: (fiends: any) => void
  step?: number
  setStep?: (step: number) => void
}>({})

export function NewClientProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<NewClient | undefined>()
  const [friends, setFriends] = useState([])
  const [step, setStep] = useState(0)
  return (
    <NewClientContext.Provider
      value={{
        client,
        setClient,
        friends,
        setFriends,
        step: 0,
        setStep
      }}
    >
      {children}
    </NewClientContext.Provider>
  )
}
