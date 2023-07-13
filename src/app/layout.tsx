import Navigation from '@/components/Navigation'
import './globals.css'

import { Inter } from 'next/font/google'
import { UserContextProvider } from '@/context/user'
import { PickerDateContextProvider } from '@/context/picker-date'
import { ClientsContextProvider } from '@/context/clients'
import { CollaboratorsContextProvider } from '@/context/collaborators'
import { ParkContextProvider } from '@/context/park'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'BajaBlastApp',
  description: 'BajaBlast platform. Make easy admin your park',
  applicationName: 'BajaBlast',

  keywords: [
    'La Paz',
    'Baja California Sur',
    'BCS',
    'Balandra',
    'Cabos',
    'Cabo San Lucas',
    'Todos Santos, La Paz',
    'Familia'
  ],
  authors: [{ name: 'Raúl Zarza', url: 'https://raulzarza.com' }],
  // colorScheme: 'dark',
  creator: 'RZ',
  // publisher: 'Sebastian Markbåge',
  // formatDetection: {
  //   email: false,
  //   address: false,
  //   telephone: false
  // }
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/apple-touch-icon.png'
  }
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
          <ParkContextProvider>
            <UserContextProvider>
              <ClientsContextProvider>
                <CollaboratorsContextProvider>
                  <Navigation />
                  {children}
                </CollaboratorsContextProvider>
              </ClientsContextProvider>
            </UserContextProvider>
          </ParkContextProvider>
        </PickerDateContextProvider>
      </body>
    </html>
  )
}
