'use client'
import withAuth from '@/HOCs/withAuth'
import AwaitingClients from '@/components/AwaitingClients'
import LinkApp from '@/components/LinkApp'
import { Box, Typography } from '@mui/material'

const page = () => {
  return (
    <div>
      <Typography variant="h4" className="text-center">
        Caja
      </Typography>
      <Box className="w-full flex justify-evenly">
        <LinkApp href="/bb/admin/cashbox/newClient" label="Nuevo cliente" />
      </Box>
      <AwaitingClients />
    </div>
  )
}

export default withAuth(page, ['COLLABORATOR'])
