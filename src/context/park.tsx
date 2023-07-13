'use client'

import { listenSelectedParkConfiguration } from '@/firebase/parkConfigurations'
import { ParkConfiguration } from '@/types/parkConfiguration'
import { ReactNode, createContext, useEffect, useState } from 'react'

export type ParkContextType = {
  configuration?: ParkConfiguration | null
  setConfiguration?: (config?: ParkConfiguration | null) => void
}

export const ParkContext = createContext<ParkContextType>({})

export function ParkContextProvider({ children }: { children: ReactNode }) {
  const [configuration, setConfiguration] = useState<
    ParkConfiguration | null | undefined
  >(null)

  useEffect(() => {
    listenSelectedParkConfiguration((res: ParkConfiguration[]) =>
      setConfiguration(res?.[0])
    )
  }, [])

  return (
    <ParkContext.Provider value={{ configuration, setConfiguration }}>
      {children}
    </ParkContext.Provider>
  )
}
