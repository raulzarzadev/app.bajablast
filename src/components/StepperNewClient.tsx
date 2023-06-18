import Stepper from './Stepper'
import ClientForm from './ClientForm'
import AddFriendsForm from './AddFriendsForm'
import SelectParkActivity from './SelectParcActivity'
import { NewClientContext, NewClientProvider } from '@/context/new-client'
import { useContext } from 'react'
import FinishNewClient from './FinishNewClient'

export default function StepperNewClient() {
  return (
    <NewClientProvider>
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
            component: <FinishNewClient />
          }
        ]}
      />
    </NewClientProvider>
  )
}
