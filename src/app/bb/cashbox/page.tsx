'use client'
import withAuth from '@/HOCs/withAuth'
import LinkApp from '@/components/LinkApp'
import { Box, Typography } from '@mui/material'

const Cashbox = () => {
  return (
    <Box
      component={'section'}
      className="flex flex-col justify-center items-center pt-12"
    >
      <Typography component={'h4'} variant="h4">
        Caja
      </Typography>
      <Box className="my-4">
        <LinkApp href={'/bb/cashbox/clients'} label="Usuarios" />
      </Box>
    </Box>
  )
}

export default withAuth(Cashbox)
