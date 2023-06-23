'use client'
import withAuth from '@/HOCs/withAuth'
import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'

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
        <Button LinkComponent={Link} href={'/bb/cashbox/clients'}>
          Usuarios
        </Button>
      </Box>
    </Box>
  )
}

export default withAuth(Cashbox)
