'use client'
import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'

const Clients = () => {
  return (
    <Box
      component={'section'}
      className="flex flex-col justify-center items-center pt-12"
    >
      <Typography component={'h4'} variant="h4">
        Lista de clientes
      </Typography>
      <Box className="flex flex-col gap-4 mt-4">
        <Button LinkComponent={Link} href="clients/new">
          Nuevo cliente
        </Button>
      </Box>
    </Box>
  )
}

export default Clients
