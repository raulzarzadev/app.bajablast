import { UserContext } from '@/context/user'
import { Box, Typography } from '@mui/material'
import { useContext } from 'react'

const ClientOptions = () => {
  const { user } = useContext(UserContext)
  return (
    <Box component="section" aria-label="client-section">
      <Box aria-label="client-activites">
        <Typography component="h2">Actividades</Typography>
        <Typography component="p" className="text-center">
          No hay actividaes aún
        </Typography>
      </Box>
      <Box aria-label="client-rentals">
        <Typography component="h2">Rentas</Typography>
        <Typography component="p" className="text-center">
          No hay rentas aún
        </Typography>
      </Box>
      <Box aria-label="client-offers">
        <Typography component="h2">Promociones</Typography>
        <Typography component="p" className="text-center">
          No tienes promociones aún
        </Typography>
      </Box>
    </Box>
  )
}

export default ClientOptions
