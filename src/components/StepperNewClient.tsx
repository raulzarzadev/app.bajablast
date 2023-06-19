import Stepper, { ManageStepper } from './Stepper'
import ClientForm from './ClientForm'
import AddFriendsForm from './AddFriendsForm'
import SelectParkActivity from './SelectParkActivity'
import { createContext, useContext, useState } from 'react'
import FinishNewClient from './FinishNewClient'
import { NewClientContext, NewClientProvider } from '@/context/new-client'
import { NewClient } from '@/types/user'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()
  const onSubmit = async () => {
    const { client, friends } = newClientContext

    return new Promise<void>((res, rej) => {
      // setTimeout(() => {
      //   rej()
      // }, 500)
      console.log({ client, friends })
      const db = localStorage.getItem('tmp-bb-db') || '[]'

      const oldDB = JSON.parse(db)

      console.log({ oldDB })

      //Delete old client when is editing

      const newClient = {
        ...client,
        friends
      }
      const oldDbClean = oldDB.filter(
        (client: any) => client.id !== newClient.id
      )
      console.log({ oldDbClean, client })
      const newDB = [...oldDbClean, newClient]

      localStorage.setItem('tmp-bb-db', JSON.stringify(newDB))
      setTimeout(() => {
        res()
        router.push('/bb/cashbox/clients')
      }, 2000)
    })
  }
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
                  ...(newClientContext.friends as NewClient[])
                ]}
                setClients={(clients) => {
                  newClientContext?.setClient?.(clients?.[0] as NewClient)
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
            component: (
              <FinishNewClient
                clients={[
                  newClientContext.client as NewClient,
                  ...(newClientContext.friends as NewClient[])
                ]}
                handleFinish={async () => {
                  console.log('finish')
                  return onSubmit()
                }}
              />
            )
          }
        ]}
      />
    </StepperContext.Provider>
  )
}

export default function StepperNewClientContext({
  client
}: {
  client?: NewClient
}) {
  return (
    <NewClientProvider client={client}>
      <StepperNewClient />
    </NewClientProvider>
  )
}
