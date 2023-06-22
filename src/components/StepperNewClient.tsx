import Stepper, { ManageStepper } from './Stepper'
import ClientForm from './ClientForm'
import AddFriendsForm from './AddFriendsForm'
import SelectParkActivity from './SelectParkActivity'
import { createContext, useContext, useState } from 'react'
import FinishNewClient from './FinishNewClient'
import { NewClientContext, NewClientProvider } from '@/context/new-client'
import { NewClient } from '@/types/user'
import { useRouter } from 'next/navigation'
import { createClient, updateUser } from '@/firebase/users'

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
  console.log(newClientContext.client)
  const onSubmit = async () => {
    try {
      const { client, friends } = newClientContext

      const newUser = {
        ...client,
        friends
      }
      if (client?.id) {
        const res = await updateUser(client.id, { ...newUser })
        console.log({ res })
        return res
      } else {
        const userResponse = await createClient(newUser)
        delete newUser.id
        const createdClient: NewClient = {
          name: '',
          email: '',
          phone: '',
          birthday: newUser.birthday || new Date(),
          rol: 'CLIENT',
          emergencyPhone: '',
          bloodType: 'N/A',
          medicalInfo: '',
          image: '',
          ...newUser,
          id: userResponse?.res?.id
        }
        newClientContext?.setClient?.({ ...createdClient })
        return userResponse
      }
    } catch (error) {
      console.error(error)
    }
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
                  await onSubmit()
                  router.push('/bb/cashbox/clients')
                  return
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
