'use client'
import Stepper, { ManageStepper } from './Stepper'
import ClientForm from './ClientForm'
import AddFriendsForm from './AddFriendsForm'
import SelectParkActivity from './SelectParkActivity'
import { createContext, useContext, useState } from 'react'
import FinishNewClient from './FinishNewClient'
import { NewClientContext, NewClientProvider } from '@/context/new-client'
import { NewClient } from '@/types/user'
import { useRouter } from 'next/navigation'
import { createClient, updateClient } from '@/firebase/clients'
import AddUsersForm from './AddUsersForm'

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
    try {
      const { client, friends } = newClientContext

      const newUser = {
        ...client,
        friends
      }
      if (client?.id) {
        const res = await updateClient(client.id, { ...newUser }).catch((err) =>
          console.error(err)
        )
        console.log({ res })
        return res
      } else {
        const userResponse = await createClient(newUser).catch((err) =>
          console.error(err)
        )
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
          // {
          //   label: 'Datos de cliente',
          //   component: (
          //     <ClientForm
          //       client={newClientContext.client}
          //       handleSubmit={(client) => {
          //         setStep((prev) => prev + 1)
          //         newClientContext.setClient?.(client)
          //       }}
          //     />
          //   )
          // },
          {
            label: 'Usuarios',
            component: (
              <AddUsersForm
                handleFinish={(friends) => {
                  newClientContext.setFriends?.(friends)
                  setStep((prev) => prev + 1)
                }}
                //users={newClientContext.friends}
              />
            )
          },
          {
            label: 'Actividades',
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
            label: 'Registrar',
            component: (
              <FinishNewClient
                clients={[
                  newClientContext.client as NewClient,
                  ...(newClientContext.friends as NewClient[])
                ]}
                handleFinish={async () => {
                  await onSubmit()
                  router.push('/bb/admin/cashbox')
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
