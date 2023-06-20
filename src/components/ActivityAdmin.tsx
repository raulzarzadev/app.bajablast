import { Typography } from '@mui/material'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import ClientsChart from './ClientsChart'

const ActivityAdmin = () => {
  return (
    <div>
      <Typography>Admin</Typography>
      <ClientsChart />
    </div>
  )
}

export default ActivityAdmin
