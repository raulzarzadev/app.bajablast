'use client'

import { UserType } from '@/types/user'
import { ReactNode, createContext, useState } from 'react'

export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => {}
})

export type UserContextType = {
  user: UserType | null | undefined
  setUser: (newUser: UserType | null) => void
}

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null | undefined>(undefined)
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
