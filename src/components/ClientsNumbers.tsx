'use client'
import useClients from '@/hooks/useClients'
import ClientsChart from './ClientsChart'
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { isThisMonth, isThisWeek, isToday } from 'date-fns'
import asDate from '@/utils/asDate'
import { Client } from '@/types/user'
import useModal from '@/hooks/useModal'
import Modal from './Modal'
import CurrencySpan from './CurrencySpan'
import AgeSpan from './AgeSpan'

const ClientsNumbers = () => {
  const { clients } = useClients()

  const groupedClients = groupClients(clients || [])
  return (
    <div>
      <h4 className="text-2xl text-center my-4 ">Estadisticas del parque</h4>
      <Typography variant="h4">Usuarios</Typography>
      <TableContainer component={Paper}>
        <Table size="small" className="mx-auto">
          <TableHead>
            <TableRow>
              <TableCell>Actividad</TableCell>
              <TableCell>Usuarios</TableCell>
              <TableCell>Hoy</TableCell>
              <TableCell>Esta semana</TableCell>
              <TableCell>Este mes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(groupedClients).map(([activityName, users]) => (
              <UsersRow
                key={activityName}
                activityName={activityName}
                users={users}
              ></UsersRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <ClientsChart /> */}
    </div>
  )
}

const UsersRow = ({
  users,
  activityName
}: {
  users: GroupedData[string]
  activityName: string
}) => {
  const { total, today, thisWeek, thisMonth } = users
  return (
    <TableRow>
      <TableCell>{activityName}</TableCell>
      <TableCell>{total?.length}</TableCell>
      <TableCell>
        <UsersDetails users={today} />
      </TableCell>
      <TableCell>
        <UsersDetails users={thisWeek} />
      </TableCell>
      <TableCell>
        <UsersDetails users={thisMonth} />
      </TableCell>
    </TableRow>
  )
}

const UsersDetails = ({ users = [] }: { users: any }) => {
  const openToday = useModal()
  return (
    <>
      <Button
        onClick={() => {
          openToday.handleOpen()
        }}
      >
        {users?.length}
      </Button>
      <Modal {...openToday} title="Usuarios">
        <TableContainer component={Paper} className="mx-auto w-full">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="font-bold">Usuario</TableCell>
                <TableCell className="font-bold">Tipo </TableCell>
                <TableCell className="font-bold">Edad </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((client: any) => (
                <TableRow key={client.id}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>
                    {client.rol === 'CLIENT' ? 'Cliente' : 'Acompañante'}
                  </TableCell>
                  <TableCell>
                    <AgeSpan birthday={client.birthday} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Modal>
    </>
  )
}
type GroupedData = {
  [key: string]: {
    total: any[]
    today: any[]
    thisWeek: any[]
    thisMonth: any[]
  }
}
const groupClients = (clients: Client[]): GroupedData =>
  clients?.reduce((groups: { [key: string]: any }, client) => {
    const activityName = client?.activity?.name || '' // Obtener el nombre de la actividad

    if (!groups[activityName]) {
      groups[activityName] = {
        total: [],
        today: [],
        thisWeek: [],
        thisMonth: []
      } // Crear un nuevo grupo si no existe
    }

    groups[activityName].total.push(client) // Agregar el objeto al grupo total

    // format a date if not exist make it today
    const clientPaymentDate =
      (client.payment?.created?.at && asDate(client.payment?.created?.at)) ||
      new Date()

    if (isToday(clientPaymentDate)) {
      groups[activityName].today.push(client) // Agregar el objeto al grupo today
    }

    if (isThisWeek(clientPaymentDate)) {
      groups[activityName].thisWeek.push(client) // Agregar el objeto al grupo thisWeek
    }

    if (isThisMonth(clientPaymentDate)) {
      groups[activityName].thisMonth.push(client) // Agregar el objeto al grupo thisMonth
    }

    if (client.friends) {
      client.friends.forEach((friend) => {
        const friendActivityName = friend?.activity?.name || ''

        if (!groups[friendActivityName]) {
          groups[friendActivityName] = {
            total: [],
            today: [],
            thisWeek: [],
            thisMonth: []
          } // Crear un nuevo grupo si no existe
        }

        groups[friendActivityName].total.push(friend) // Agregar el objeto al grupo total de amigos

        if (isToday(clientPaymentDate)) {
          groups[friendActivityName].today.push(friend) // Agregar el objeto al grupo today de amigos
        }

        if (isThisWeek(clientPaymentDate)) {
          groups[friendActivityName].thisWeek.push(friend) // Agregar el objeto al grupo thisWeek de amigos
        }

        if (isThisMonth(clientPaymentDate)) {
          groups[friendActivityName].thisMonth.push(friend) // Agregar el objeto al grupo thisMonth de amigos
        }
      })
    }

    return groups
  }, {}) as GroupedData

export default ClientsNumbers
