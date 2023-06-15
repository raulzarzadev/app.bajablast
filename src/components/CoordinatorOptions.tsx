import { Box, Typography } from '@mui/material'
import Link from 'next/link'

const CoordinatorOptions = () => {
  return (
    <Box component="section" aria-label="coordinator-section">
      <Box aria-label="collaborators-section">
        <Typography component="h2">Colaboradores</Typography>
        <Typography component="p">Aun no hay colaboradores activos</Typography>
      </Box>
      <Box aria-label="activities-section">
        <Typography component="h2">Actividades</Typography>
        <Typography component="p">Aun no hay actividades </Typography>
      </Box>
      <Box aria-label="show-clients-section">
        <Typography component="h2">Clientes</Typography>
        <Typography component="p">Aun no hay clientes</Typography>
      </Box>
      <Box aria-label="show-stats-section">
        <Typography component="h2">Estadisticas</Typography>
        <Typography component="p">Aun no hay estadisticas</Typography>
      </Box>
    </Box>
  )
}

export default CoordinatorOptions
