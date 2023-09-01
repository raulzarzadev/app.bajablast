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
import { Client, Friend, ParkUser, UserType } from '@/types/user'
import useModal from '@/hooks/useModal'
import Modal from './Modal'
import AgeSpan from './AgeSpan'
import LinkApp from './LinkApp'
import ClientList from './ClientList'
import UsersList from './UsersList'
import ExportDocument from './ExportDocument'
import BasicTabs from './BasicTabs'
import useUser from '@/hooks/useUser'
import InsufficientPermissionsCard from './InsufficientPermissionsCard'
import usePermissions from '@/hooks/usePermissions'

const ClientsNumbers = () => {
  const { clients } = useClients()

  const groupedClients = groupUsersByActivity(clients || [])

  const canVisit = usePermissions(['COORDINATOR', 'ADMIN'])
  if (!canVisit) return <InsufficientPermissionsCard />
  return (
    <div>
      <h4 className="text-2xl text-center my-4 ">Estadisticas del parque</h4>

      <ExportDocument
        document={formatClientsToExport(clients)}
        fileName="clients-data"
      />
      <BasicTabs
        tabs={[
          {
            label: 'Clientes por actividad',
            content: (
              <UsersByActivity clients={groupedClients}></UsersByActivity>
            )
          },
          {
            label: 'Por clientes',
            content: <ClientList />
          },
          {
            label: 'Por usuarios',
            content: (
              <UsersList users={allUsersFromClientsAndPaymentDate(clients)} />
            )
          }
        ]}
      />
    </div>
  )
}

const UsersByActivity = ({ clients }: { clients: GroupedData }) => {
  return (
    <>
      {' '}
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
            {Object.entries(clients).map(([activityName, users]) => (
              <UsersRow
                key={activityName}
                activity={{
                  name: activityName,
                  id: users?.activity?.id
                }}
                users={users}
              ></UsersRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

const formatClientsToExport = (clients: Client[] = []) => {
  return clients.map((client) => {
    return {
      //...client,
      name: client?.name || '',
      birthday: asDate(client?.birthday),
      weight: client.weight,
      email: client?.email || '',
      phone: client?.phone || '',
      emergencyPhone: client?.emergencyPhone || '',
      bloodType: client?.bloodType || '',
      medicalInfo: client?.medicalInfo || '',
      // image: client?.image || '',

      activities: `${
        client.activity
          ? client.activity.name
          : client.activities?.map((a) => a.name)
      }\n`,
      friends: client.friends?.length,
      friendsActivities: `${client.friends?.map(
        (f) =>
          `${f.name}-${
            f.activity ? f.activity.name : f.activities?.map((a) => a.name)
          }\n`
      )}`,
      paymentDate: asDate(client?.payment?.created?.at),
      paymentAmount: client?.payment?.amount || 0,
      paymentMethod: client?.payment?.method,
      paymentDiscount: client.payment?.discount,
      paymentIsCanceled: !!client?.payment?.isCancelled
    }
  })
}

const allUsersFromClientsAndPaymentDate = (
  clients: Client[] = []
): Partial<ParkUser>[] => {
  return (
    clients?.flatMap((client) => {
      return [
        { ...client, paymentDate: client?.payment?.created?.at },
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
      <TableCell>
        <UsersDetails users={total} />
      </TableCell>
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
const groupUsersByActivity_ = (clients: Client[]): GroupedData =>
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

    const groupMultipleActivities = (activities: Client['activities'] = []) =>
      activities?.forEach((a) => {
        if (!groups[a.name]) {
          groups[activityName] = {
            activity,
            total: [],
            today: [],
            thisWeek: [],
            thisMonth: []
          } // Agregar actividad al grupo de actividades
        }
      })

    const clientActivities = client?.activities || []
    if (clientActivities.length) {
      groupMultipleActivities(clientActivities)
    }
    const clientPaymentDate =
      client.payment?.created?.at && asDate(client.payment?.created?.at)
    if (!clientPaymentDate) {
      return groups
    }

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
        const friendActivities = friend?.activities || []
        if (friendActivities) {
          groupMultipleActivities(friendActivities)
        }
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

const groupUsersByActivity = (clients: Client[]): GroupedData => {
  let grouped: GroupedData = {}
  //* format clients as user with their friends
  const users = allUsersFromClientsAndPaymentDate(clients)
  //* group users
  users.forEach((user) => {
    //* determinate de client payment for user
    const userMultiActivity = user?.activities || []
    const clientPaymentDate = asDate(user?.paymentDate)
    if (!clientPaymentDate) {
      return grouped
    }

    //* group user with multiple activity
    if (userMultiActivity?.length > 0) {
      user.activities?.forEach((activity) => {
        const activityName = activity?.name || ''
        if (!activityName) return
        if (!grouped[activityName]) {
          grouped[activityName] = {
            activity: {
              id: activity?.id || '',
              name: activity?.name || ''
            },
            total: [],
            today: [],
            thisWeek: [],
            thisMonth: []
          }
        }
        // Add to total
        grouped[activityName].total.push(user)
        // Agregar el objeto al grupo today
        if (isToday(clientPaymentDate)) {
          grouped[activityName].today.push(user)
        }
        // Agregar el objeto al grupo thisWeek
        if (isThisWeek(clientPaymentDate)) {
          grouped[activityName].thisWeek.push(user)
        }
        // Agregar el objeto al grupo thisMonth
        if (isThisMonth(clientPaymentDate)) {
          grouped[activityName].thisMonth.push(user)
        }
      })
    }
    const userActivity = user.activity
    const activityName = userActivity?.name || ''

    //* group user with single activity
    if (!activityName) return

    if (!grouped[activityName]) {
      grouped[activityName] = {
        activity: {
          id: userActivity?.id || '',
          name: userActivity?.name || ''
        },
        total: [],
        today: [],
        thisWeek: [],
        thisMonth: []
      }
    }

    grouped[activityName].total.push(user)
  })
  return grouped
}
export default ClientsNumbers
