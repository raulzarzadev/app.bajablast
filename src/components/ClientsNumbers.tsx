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
import { Client, Friend } from '@/types/user'
import useModal from '@/hooks/useModal'
import Modal from './Modal'
import AgeSpan from './AgeSpan'
import LinkApp from './LinkApp'
import ClientList from './ClientList'
import UsersList from './UsersList'

const ClientsNumbers = () => {
  const { clients } = useClients()

  const groupedClients = groupClients(clients || [])

  return (
    <div>
      <h4 className="text-2xl text-center my-4 ">Estadisticas del parque</h4>
      <Typography variant="h4">Usuarios por actividad</Typography>
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
                activity={{ name: activityName, id: users.activity.id }}
                users={users}
              ></UsersRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h4">Lista de clientes</Typography>
      <ClientList />
      <Typography variant="h4">Lista de usuarios</Typography>
      <UsersList users={allUsersFromClients(clients)} />
      {/* <ClientsChart /> */}
    </div>
  )
}

const allUsersFromClients = (clients: Client[] = []): (Client | Friend)[] => {
  return (
    clients?.flatMap((client) => {
      return [
        client,
        ...(client?.friends?.map((friend) => ({
          ...friend,
          paymentDate: client?.payment?.created?.at
        })) || [])
      ]
    }) || []
  )
}

const UsersRow = ({
  users,
  activity
}: {
  users: GroupedData[string]
  activity: {
    name: string
    id: string
  }
}) => {
  const { total, today, thisWeek, thisMonth } = users
  return (
    <TableRow>
      <TableCell>
        <LinkApp href={`/bb/${activity?.id}`} label={activity?.name} />
      </TableCell>
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
    activity: {
      name: string
      id: string
    }
    total: any[]
    today: any[]
    thisWeek: any[]
    thisMonth: any[]
  }
}
const groupClients = (clients: Client[]): GroupedData =>
  clients?.reduce((groups: { [key: string]: any }, client) => {
    const activityName = client?.activity?.name || '' // Obtener el nombre de la actividad
    const activity = {
      name: activityName,
      id: client?.activity?.id
    }
    if (!groups[activityName]) {
      groups[activityName] = {
        activity,
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
        const friendActivity = {
          name: friendActivityName,
          id: friend?.activity?.id
        }
        if (!groups[friendActivityName]) {
          groups[friendActivityName] = {
            activity: friendActivity,
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