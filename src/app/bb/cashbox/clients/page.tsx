'use client'
import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'

const Clients = () => {
  return (
    <Box component={'section'}>
      <Typography component={'h4'} variant="h4">
        Lista de clientes
      </Typography>
      <Box>
        <Button LinkComponent={Link} href="clients/new">
          Nuevo
        </Button>
      </Box>
    </Box>
  )
}

export default Clients
