'use client'
import withAuth from '@/HOCs/withAuth'
import { Container, Typography } from '@mui/material'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts'

const createDoubleData = (title: string, clients: number, avg: number) => ({
  title,
  ingreso: avg,
  clientes: clients
})
const incomeVsUitlies = [
  createDoubleData('Enero', 200, 350),
  createDoubleData('Febrero', 250, 350),
  createDoubleData('Marzo', 250, 350),
  createDoubleData('Abril', 240, 200),
  createDoubleData('Mayo', 220, 250),
  createDoubleData('Junio', 400, 150),
  createDoubleData('Julio', 200, 450),
  createDoubleData('Agosto', 300, 550),
  createDoubleData('Septiembre', 450, 350),
  createDoubleData('Octubre', 350, 350)
]
const Admin = () => {
  return (
    <div>
      <Typography className="text-center" variant="h5">
        Ingresos Vs Clientes{' '}
      </Typography>
      <DoubleChart
        data={incomeVsUitlies}
        key1="utils"
        key2="spends"
        keyTitle="title"
        color1="#8884d8"
        color2="#82ca9d"
      />
    </div>
  )
}
const DoubleChart = ({
  data,
  color1 = '#820a9d',
  color2 = '#82ca9d'
}: {
  data: any[]
  color1: `#${string}`
  color2: `#${string}`
  key1: string
  key2: string
  keyTitle: string
}) => {
  return (
    <Container className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
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
          <XAxis dataKey={'title'} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="ingreso"
            stackId="1"
            stroke={color2}
            fill={color2}
          />
          <Area
            type="monotone"
            dataKey="clientes"
            stackId="1"
            stroke={color1}
            fill={color1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Container>
  )
}

export default withAuth(Admin)
