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

export function NewClientProvider({
  children,
  client
}: {
  client?: NewClient
  children: ReactNode
}) {
  const [_client, setClient] = useState<NewClient | undefined>(client)
  const [friends, setFriends] = useState(client?.friends || [])
  const [step, setStep] = useState(0)
  return (
    <NewClientContext.Provider
      value={{
        client: _client,
        setClient,
        friends,
        setFriends,
        step,
        setStep
      }}
    >
      {children}
    </NewClientContext.Provider>
  )
}
