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
  title: 'BajaBlast',
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
  },

  //* pwa metadata

  // applicationName: 'PWA App',
  // description: 'Best PWA App in the world',
  // formatDetection: 'telephone=no',
  appleMobileWebAppCapable: 'yes',
  appleMobileWebAppStatusBarStyle: 'default',
  appleMobileWebAppTitle: 'PWA App',
  mobileWebAppCapable: 'yes',
  msapplicationConfig: '/icons/browserconfig.xml',
  msapplicationTileColor: '#2B5797',
  msapplicationTapHighlight: 'no',
  themeColor: '#000000',
  appleTouchIcon: '/icons/touch-icon-iphone.png',
  appleTouchIconSizes152x152: '/icons/touch-icon-ipad.png',
  appleTouchIconSizes180x180: '/icons/touch-icon-iphone-retina.png',
  appleTouchIconSizes167x167: '/icons/touch-icon-ipad-retina.png',
  icon: '/icons/favicon-32x32.png',
  iconSizes32x32: '/icons/favicon-16x16.png',
  manifest: '/manifest.json',
  maskIcon: '/icons/safari-pinned-tab.svg',
  shortcutIcon: '/favicon.ico',
  stylesheet: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500'
  // twitterCard: 'summary',
  // twitterUrl: 'https://yourdomain.com',
  // twitterTitle: 'PWA App',
  // twitterDescription: 'Best PWA App in the world',
  // twitterImage: 'https://yourdomain.com/icons/android-chrome-192x192.png',
  // twitterCreator: '@DavidWShadow'
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
