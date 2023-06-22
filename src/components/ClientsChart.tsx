import { Container, Typography } from '@mui/material'
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
const clientsByDays: any[] = []
for (let i = 14; i <= 24; i++) {
  clientsByDays.push(
    createData(`${i}:00`, parseFloat((Math.random() * 10).toFixed()))
  )
}
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

const ClientsChart = () => {
  const demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v'
  return (
    <>
      <Typography>Clientes por dia</Typography>
      <Chart data={clientsByDays} color="#82ca9d" />
      <Typography>Clientes por Semana</Typography>
      <Chart data={clientsWeek} color="#820a9d" />
      <Typography>Clientes por año</Typography>
      <Chart data={clientsYear} color="#820a9d" />
      <Typography>Clientes por año</Typography>
      <Chart data={clientsYear} color="#820a9d" />
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

export default ClientsChart