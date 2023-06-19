import Stepper, { ManageStepper } from './Stepper'
import ClientForm from './ClientForm'
import AddFriendsForm from './AddFriendsForm'
import SelectParkActivity from './SelectParcActivity'
import { createContext, useContext, useState } from 'react'
import FinishNewClient from './FinishNewClient'
import { NewClientContext, NewClientProvider } from '@/context/new-client'
import { NewClient } from '@/types/user'

export type StepperContextType = {
  step: number
  setStep: (prev: number) => void
}
export const StepperContext = createContext<StepperContextType>({
  setStep: (prev) => console.log(prev),
  step: 0
})
function StepperNewClient() {
  const [step, setStep] = useState(0)
  const newClientContext = useContext(NewClientContext)
  return (
    <StepperContext.Provider value={{ step, setStep }}>
      <Stepper
        steps={[
          {
            label: 'Datos de cliente',
            component: (
              <ClientForm
                client={newClientContext.client}
                handleSubmit={(client) => {
                  setStep((prev) => prev + 1)
                  newClientContext.setClient?.(client)
                }}
              />
            )
          },
          {
            label: 'Agregar acompañantes',
            component: (
              <AddFriendsForm
                handleFinish={(friends) => {
                  newClientContext.setFriends?.(friends)
                  setStep((prev) => prev + 1)
                }}
                friends={newClientContext.friends}
              />
            )
          },
          {
            label: 'Seleccionar actividad',
            component: (
              <SelectParkActivity
                clients={[
                  newClientContext.client as NewClient,
                  ...(newClientContext.friends || [])
                ]}
                setClients={(clients) => {
                  newClientContext?.setClient?.(clients[0])
                  newClientContext.setFriends?.(clients.slice(1))
                }}
                handleFinish={() => {
                  setStep((prev) => prev + 1)
                }}
              />
            )
          },
          {
            label: 'Pagar',
            component: <FinishNewClient />
          }
        ]}
      />
    </StepperContext.Provider>
  )
}

export default function StepperNewClientCOntext() {
  return (
    <NewClientProvider>
      <StepperNewClient />
    </NewClientProvider>
  )
}
