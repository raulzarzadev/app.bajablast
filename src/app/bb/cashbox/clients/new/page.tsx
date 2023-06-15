'use client'
import ClientForm from '@/components/ClientForm'
import { Box, Typography } from '@mui/material'

const NewClient = () => {
  return (
    <Box className="p-2" component={'section'}>
      <Typography component={'h4'} variant="h4" className="text-center my-4">
        Nuevo cliente
      </Typography>
      <ClientForm />
    </Box>
  )
}

export default NewClient
