'use client'

import { ReactNode, createContext } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

export const UserContext = createContext(AdapterDateFns)

export function PickerDateContextProvider({
  children
}: {
  children: ReactNode
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {children}
    </LocalizationProvider>
  )
}
