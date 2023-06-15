'use client'
import ClientForm from '@/components/ClientForm'
import { Typography } from '@mui/material'

const NewClient = () => {
  return (
    <div>
      <Typography component={'h4'} variant="h4">
        Nuevo cliente
      </Typography>
      <ClientForm />
    </div>
  )
}

export default NewClient
