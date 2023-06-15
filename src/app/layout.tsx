import Navigation from '@/components/Navigation'
import './globals.css'

import { Inter } from 'next/font/google'
import { UserContextProvider } from '@/context/user'
import { PickerDateContextProvider } from '@/context/picker-date'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'BajaBlast app',
  description: 'BajaBlast platform. Make easy admin your park'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PickerDateContextProvider>
          <UserContextProvider>
            <Navigation />
            {children}
          </UserContextProvider>
        </PickerDateContextProvider>
      </body>
    </html>
  )
}
