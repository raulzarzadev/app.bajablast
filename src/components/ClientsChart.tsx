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
  ResponsiveContainer,
  Label
} from 'recharts'

const ClientsChart = ({ activityId }: { activityId: string }) => {
  // const demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v'

  const { clients } = useClients()
  const grouped = groupClientsByActivityId(clients, activityId)

  const clientsWeek = groupClientsByWeekday(grouped.thisWeek)

  //const today = formatGroupedDataToArray(grouped.today)
  const clientsToday = groupClientsByHour(grouped.today)
  const fromEver = groupClientsByDay(clients)
  return (
    <>
      <Typography variant="h5" className="text-center">
        Hoy{' '}
      </Typography>
      <Chart
        data={clientsToday}
        color="#820a9d"
        YLabel="Cantidad de U"
        XLabel="Hora del día"
        lineName="Usuarios"
      />
      <Typography variant="h5" className="text-center">
        Esta semana
      </Typography>
      <Chart
        data={clientsWeek}
        color="#82ca9d"
        YLabel="Cantidad de U"
        XLabel="Dias de la semana"
        lineName="Usuarios"
      />
      <Typography variant="h5" className="text-center">
        Desde siempre
      </Typography>
      <Chart
        data={fromEver}
        color="#82ca9d"
        YLabel="Cantidad de U"
        XLabel="Día"
        lineName="Usuarios"
      />
      {/*
      <Typography>Clientes ultimos 15 días</Typography>
      <Chart data={clientsLast15Days} color="#820a9d" />
      <Typography>Clientes este año</Typography>
      <Chart data={clientsYear} color="#820a9d" /> */}
    </>
  )
}

const Chart = ({
  data,
  color,
  YLabel,
  XLabel,
  lineName
}: {
  data: any[]
  color: `#${string}`
  YLabel?: string
  lineName?: string
  XLabel?: string
}) => {
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
            bottom: 20
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time">
            <Label value={XLabel} offset={-10} position="insideBottom" />
          </XAxis>
          <YAxis label={{ value: YLabel, angle: -90 }} />
          <Tooltip />
          <Legend verticalAlign="top" />
          <Line
            name={lineName}
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

    clientData.forEach((c) => {
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
  clientData?: Client[]
): { time: string; quantity: number }[] => {
  const groupedData: { time: string; quantity: number }[] = []

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

    clientData?.forEach((client) => {
      const paymentDate = asDate(client.payment?.created.at)
      if (!paymentDate) return
      const clientPaymentWeekday = getWeekdayFromDate(paymentDate)
      if (client.friends?.length) {
        client.friends.forEach((friend) => {
          const friendPaymentWeekday = getWeekdayFromDate(paymentDate)
          if (friendPaymentWeekday === weekday) {
            quantity++
          }
        })
      }

      if (clientPaymentWeekday === weekday) {
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

const groupClientsByDay = (
  clientData?: Client[]
): { time: string; quantity: number }[] => {
  const groupedData: { time: string; quantity: number }[] = []

  clientData?.forEach((client) => {
    const clientPaymentDate = dateFormat(
      asDate(client.payment?.created.at),
      'dd-MMM'
    )
    if (!clientPaymentDate) return
    if (clientPaymentDate) {
      addOrUpdateGroupedData(clientPaymentDate, groupedData)
    }

    if (client.friends) {
      client.friends.forEach((friend) => {
        addOrUpdateGroupedData(clientPaymentDate, groupedData)
      })
    }
  })

  return groupedData.sort((a, b) => {
    if ((asDate(a.time)?.getTime() || 0) > (asDate(b.time)?.getTime() || 0))
      return 1
    if ((asDate(a.time)?.getTime() || 0) < (asDate(b.time)?.getTime() || 0))
      return -1
    return 0
  })
}

const addOrUpdateGroupedData = (
  time: string,
  groupedData: { time: string; quantity: number }[]
): void => {
  const existingGroup = groupedData.find((group) => group.time === time)

  if (existingGroup) {
    existingGroup.quantity++
  } else {
    groupedData.push({ time, quantity: 1 })
  }
}

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
  clients?: Client[],
  activityId?: string
): GroupedData => {
  const groupedData: GroupedData = {
    total: [],
    today: [],
    thisWeek: [],
    lastWeek: [],
    thisMonth: [],
    yesterday: []
  }

  clients?.forEach((client) => {
    const clientPaymentDate =
      client.payment?.created?.at && asDate(client.payment?.created?.at)
    if (!clientPaymentDate) return
    if (client.activity?.id === activityId) {
      groupedData.total.push(client)
      if (isYesterday(clientPaymentDate)) {
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
