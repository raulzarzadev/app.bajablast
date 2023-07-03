'use client'
import { listenClients } from '@/firebase/clients'
import { Client } from '@/types/user'
import { ReactNode, createContext, useEffect, useState } from 'react'

export const ClientsContext = createContext<ClientsContext>({})

export type ClientsContext = {
  clients?: Client[]
  setClients?: (clients: Client[]) => void
}

export function ClientsContextProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<Client[]>([])
  useEffect(() => {
    listenClients((res: Client[]) => {
      setClients(res)
    })
  }, [])
  return (
    <ClientsContext.Provider value={{ clients, setClients }}>
      {children}
    </ClientsContext.Provider>
  )
}
