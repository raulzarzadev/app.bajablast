'use client'
import withAuth from '@/HOCs/withAuth'
import AwaitingClients from '@/components/AwaitingClients'
import { Box, Button } from '@mui/material'
import Link from 'next/link'

const cashbox = () => {
  return (
    <div>
      <span>Caja</span>
      <AwaitingClients />
      <Box className="flex w-full justify-center">
        <Button LinkComponent={Link} href="/cashbox/new-client" className="">
          Nuevo Cliente
        </Button>
      </Box>
    </div>
  )
}

export default withAuth(cashbox, ['COLLABORATOR'])
