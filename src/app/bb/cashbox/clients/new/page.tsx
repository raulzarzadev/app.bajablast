'use client'
import AddFriendsForm from '@/components/AddFriendsForm'
import ClientForm from '@/components/ClientForm'
import { Box, Typography } from '@mui/material'

const NewClient = (props) => {
  const client = props.searchParams.formValues
    ? JSON.parse(props.searchParams.formValues)
    : undefined
  return (
    <Box className="p-2" component={'section'}>
      <Typography component={'h4'} variant="h4" className="text-center my-4">
        Nuevo cliente
      </Typography>
      <ClientForm client={client} />
    </Box>
  )
}

export default NewClient
