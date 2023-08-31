'use client'
import withAuth from '@/HOCs/withAuth'
import AwaitingClients from '@/components/AwaitingClients'
import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'

const page = () => {
  return (
    <div>
      <Typography variant="h4" className="text-center mt-4">
        Caja
      </Typography>

      <Box className="flex w-full justify-end pr-10">
        <Button LinkComponent={Link} href="/cashbox/balances" className="">
          Cortes
        </Button>
      </Box>
      <Box className="flex w-full justify-center">
        <Button LinkComponent={Link} href="/cashbox/new-client" className="">
          Nuevo Cliente
        </Button>
      </Box>
      <AwaitingClients />
    </div>
  )
}

export default withAuth(page, ['COLLABORATOR'])
