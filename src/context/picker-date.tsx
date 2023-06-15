'use client'

import { ReactNode, createContext } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export const UserContext = createContext(AdapterDayjs)

export function PickerDateContextProvider({
  children
}: {
  children: ReactNode
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
    </LocalizationProvider>
  )
}
