//const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad']

import { ReactNode, createContext, useState } from 'react'
import Stepper from './Stepper'
import ClientForm from './ClientForm'
import AddFriendsForm from './AddFriendsForm'
import SelectParkActivity from './SelectParcActivity'

export const NewClientContext = createContext<{
  client?: object
  setClient?: (newClient: object) => void
  activities?: object
  setActivities?: (newActivities: object) => void
  friends?: Array<object>
  setFriends?: (fiends: any) => void
}>({})

export default function StepperNewClient() {
  const [client, setClient] = useState({})
  const [activities, setActivities] = useState({})
  const [friends, setFriends] = useState([])
  return (
    <NewClientContext.Provider
      value={{
        client,
        setClient,
        activities,
        setActivities,
        friends,
        setFriends
      }}
    >
      <Stepper
        steps={[
          {
            label: 'Datos de cliente',
            component: <ClientForm />
          },
          {
            label: 'Agregar acompañantes',
            component: <AddFriendsForm />
          },
          {
            label: 'Seleccionar actividad',
            component: <SelectParkActivity />
          },
          {
            label: 'Guardar',
            component: <>Guardar</>
          }
        ]}
        disableNext={Object.keys(client).length === 0}
      />
    </NewClientContext.Provider>
  )
}
