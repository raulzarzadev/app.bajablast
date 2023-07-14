'use client'
import useClients from '@/hooks/useClients'
import { Client } from '@/types/user'
import asDate from '@/utils/asDate'
import { dateFormat } from '@/utils/utils-date'
import { Container, Typography } from '@mui/material'
import {
  endOfWeek,
  isThisMonth,
  isThisWeek,
  isToday,
  isWithinInterval,
  startOfWeek,
  isMonday,
  isTuesday,
  isWednesday,
  isThursday,
  isFriday,
  isSaturday,
  isSunday,
  isYesterday,
  subWeeks
} from 'date-fns'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const createData = (time: string, quantity: number) => ({ time, quantity })
const clientsByDays: any[] = [
  createData('12:00', 3),
  createData('13:00', 4),
  createData('14:00', 1),
  createData('15:00', 4),
  createData('16:00', 8),
  createData('17:00', 12),
  createData('18:00', 22),
  createData('19:00', 28),
  createData('20:00', 27),
  createData('21:00', 20),
  createData('22:00', 10),
  createData('23:00', 8)
]
// for (let i = 14; i <= 24; i++) {
//   clientsByDays.push(
//     createData(`${i}:00`, parseFloat((Math.random() * 10).toFixed()))
//   )
// }
const clientsWeek = [
  createData('Lunes', 0),
  createData('Martes', 20),
  createData('Miercoles', 19),
  createData('Jueves', 13),
  createData('Viernes', 60),
  createData('Sabado', 73),
  createData('Domingo', 45)
]
const clientsYear = [
  createData('Enero', 300),
  createData('Febrero', 222),
  createData('Marzo', 326),
  createData('Abril', 419),
  createData('Mayo', 312),
  createData('Junio', 250),
  createData('Julio', 200),
  createData('Agosto', 150),
  createData('Sepetiembre', 202),
  createData('Octubre', 300),
  createData('Noviembre', 450),
  createData('Diciembre', 850),
  createData('Enero', 350)
]
const clientsLast15Days = [
  createData('25', 200),
  createData('26', 24),
  createData('27', 30),
  createData('28', 40),
  createData('29', 70),
  createData('30', 210),
  createData('1', 200),
  createData('2', 190),
  createData('3', 40),
  createData('4', 35),
  createData('5', 22),
  createData('6', 50),
  createData('7', 170),
  createData('8', 260),
  createData('9', 190)
]

const ClientsChart = ({ activityId }: { activityId: string }) => {
  // const demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v'

  const { clients } = useClients()
  const grouped = groupClientsByActivityId(clients, activityId)

  const clientsWeek = groupClientsByWeekday(grouped.thisWeek)

  console.log({ clientsWeek })

  //const today = formatGroupedDataToArray(grouped.today)
  const clientsToday = groupClientsByHour(grouped.today)

  return (
    <>
      <Typography variant="h5" className="text-center">
        Hoy{' '}
      </Typography>
      <Chart data={clientsToday} color="#820a9d" />
      <Typography variant="h5" className="text-center">
        Esta semana
      </Typography>
      <Chart data={clientsWeek} color="#82ca9d" />
      {/*
      <Typography>Clientes ultimos 15 días</Typography>
      <Chart data={clientsLast15Days} color="#820a9d" />
      <Typography>Clientes este año</Typography>
      <Chart data={clientsYear} color="#820a9d" /> */}
    </>
  )
}

const Chart = ({ data, color }: { data: any[]; color: `#${string}` }) => {
  return (
    <Container className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="quantity"
            stroke={color}
            activeDot={{ r: 8 }}
          />
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
    </Container>
  )
}

const groupClientsByHour = (
  clientData: Client[]
): { time: string; quantity: number }[] => {
  const groupedData: { time: string; quantity: number }[] = []

  for (let hour = 10; hour <= 23; hour++) {
    const timeString = `${hour}:00`
    let quantity = 0

    const customer = clientData.forEach((c) => {
      const clientPayment = dateFormat(asDate(c.payment?.created.at), 'HH:00')
      const friendPayment = dateFormat(asDate(c.paymentDate), 'HH:00')
      if (clientPayment === timeString || friendPayment === timeString)
        quantity++
    })
    // const quantity = customer ? customer.quantity : 0

    groupedData.push({ time: timeString, quantity })
  }

  return groupedData
}

const groupClientsByWeekday = (
  clientData: Client[]
): { weekday: string; quantity: number }[] => {
  const groupedData: { weekday: string; quantity: number }[] = []

  const weekdays = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado'
  ]

  for (let i = 0; i < weekdays.length; i++) {
    const weekday = weekdays[i]
    let quantity = 0

    clientData.forEach((client) => {
      const paymentDate = asDate(client.payment?.created.at)
      if (!paymentDate) return
      const clientPaymentWeekday = getWeekdayFromDate(paymentDate)
      if (client.friends?.length) {
        client.friends.forEach((friend) => {
          const friendPaymentWeekday = getWeekdayFromDate(friend.paymentDate)
          if (
            clientPaymentWeekday === weekday ||
            friendPaymentWeekday === weekday
          ) {
            quantity++
          }
        })
      }
      const friendPaymentWeekday = getWeekdayFromDate(client.paymentDate)

      if (
        clientPaymentWeekday === weekday ||
        friendPaymentWeekday === weekday
      ) {
        quantity++
      }
    })

    groupedData.push({ time: weekday, quantity })
  }

  return groupedData
}

const getWeekdayFromDate = (date: Date | undefined): string => {
  if (!date) {
    return ''
  }

  const weekdays = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado'
  ]
  const dayIndex = date.getDay()

  return weekdays[dayIndex]
}

// const formatGroupedDataToArray = (
//   groupedData: Record<string, number>
// ): { time: string; quantity: number }[] => {
//   return Object.entries(groupedData).map(([time, quantity]) => {
//     return { time, quantity }
//   })
// }

// const groupClientsByWeekday = (
//   clientsWeek: Client[]
// ): Record<string, number> => {
//   const groupedData: Record<string, number> = {
//     lunes: 0,
//     martes: 0,
//     miércoles: 0,
//     jueves: 0,
//     viernes: 0,
//     sábado: 0,
//     domingo: 0
//   }

//   clientsWeek.forEach((client) => {
//     const clientCreationDate =
//       client.payment?.created?.at && asDate(client.payment?.created?.at)
//     if (!clientCreationDate) return

//     if (isMonday(clientCreationDate)) {
//       groupedData.lunes++
//     } else if (isTuesday(clientCreationDate)) {
//       groupedData.martes++
//     } else if (isWednesday(clientCreationDate)) {
//       groupedData.miércoles++
//     } else if (isThursday(clientCreationDate)) {
//       groupedData.jueves++
//     } else if (isFriday(clientCreationDate)) {
//       groupedData.viernes++
//     } else if (isSaturday(clientCreationDate)) {
//       groupedData.sábado++
//     } else if (isSunday(clientCreationDate)) {
//       groupedData.domingo++
//     }
//   })

//   return groupedData
// }

type GroupedData = {
  total: any[]
  today: any[]
  thisWeek: any[]
  lastWeek: any[]
  thisMonth: any[]
  yesterday: any[]
}
const isLastWeek = (date: Date): boolean => {
  const now = new Date()
  const startOfThisWeek = startOfWeek(now, { weekStartsOn: 1 }) // Assuming Monday is the start of the week
  const endOfThisWeek = endOfWeek(now, { weekStartsOn: 1 })

  const startOfLastWeek = subWeeks(startOfThisWeek, 1)
  const endOfLastWeek = subWeeks(endOfThisWeek, 1)

  return isWithinInterval(date, {
    start: startOfLastWeek,
    end: endOfLastWeek
  })
}

const groupClientsByActivityId = (
  clients: Client[],
  activityId: string
): GroupedData => {
  const groupedData: GroupedData = {
    total: [],
    today: [],
    thisWeek: [],
    lastWeek: [],
    thisMonth: [],
    yesterday: []
  }

  clients.forEach((client) => {
    const clientPaymentDate =
      client.payment?.created?.at && asDate(client.payment?.created?.at)
    if (!clientPaymentDate) return
    if (client.activity?.id === activityId) {
      groupedData.total.push(client)
      if (isYesterday(clientPaymentDate)) {
        console.log('si esta entrando')
        groupedData.yesterday.push(client)
      }
      if (isToday(clientPaymentDate)) {
        groupedData.today.push(client)
      }

      if (isThisWeek(clientPaymentDate)) {
        groupedData.thisWeek.push(client)
      }

      if (isLastWeek(clientPaymentDate)) {
        groupedData.lastWeek.push(client)
      }

      if (isThisMonth(clientPaymentDate)) {
        groupedData.thisMonth.push(client)
      }
    }
    if (client.friends?.length) {
      client.friends.forEach((friend) => {
        const friendWithPaymentDate = {
          ...friend,
          paymentDate: clientPaymentDate
        }
        groupedData.total.push({ ...friendWithPaymentDate })

        if (isToday(clientPaymentDate)) {
          groupedData.today.push(friendWithPaymentDate)
        }

        if (isThisWeek(clientPaymentDate)) {
          console.log({ clientPaymentDate })
          groupedData.thisWeek.push(friendWithPaymentDate)
        }

        if (isLastWeek(clientPaymentDate)) {
          groupedData.lastWeek.push(friendWithPaymentDate)
        }

        if (isThisMonth(clientPaymentDate)) {
          groupedData.thisMonth.push(friendWithPaymentDate)
        }
      })
    }
  })

  return groupedData
}

export default ClientsChart
