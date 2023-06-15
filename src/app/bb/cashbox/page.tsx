'use client'
import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'

const Cashbox = () => {
  return (
    <Box component={'section'}>
      <Typography component={'h4'} variant="h4">
        Caja
      </Typography>
      <Box>
        <Button LinkComponent={Link} href={'/bb/cashbox/clients'}>
          Usuarios
        </Button>
      </Box>
    </Box>
  )
}

export default Cashbox
