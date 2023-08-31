'use client'
import { NewClient } from '@/types/user'
import { Box, Typography } from '@mui/material'
import ClientsTable from '@/components/ClientsTable'
import useClients from '@/hooks/useClients'
import { deleteClient } from '@/firebase/clients'

const AwaitingClients = () => {
  const { clients = [] } = useClients()
  /**
   * Removes a user with the given client ID.
   *
   * @param clientId - The client ID of the user to be removed.
   */
  const handleRemove = async (clientId: NewClient['id']) => {
    try {
      const res = await deleteClient(clientId || '')
      //console.log({ res })
    } catch (error) {
      console.error(error)
    }
  }

  const awaitingClients = clients?.filter((client) => !client.payment)

  return (
    <Box
      component={'section'}
      className="flex flex-col justify-center items-center pt-2 max-w-2xl mx-auto p-1"
    >
      <Typography component={'h6'} variant="h6" className="w-full text-left">
        Clientes en espera
      </Typography>
      {awaitingClients?.length === 0 ? (
        <Typography variant="h6">Aún no hay clientes en espera</Typography>
      ) : (
        <ClientsTable clients={awaitingClients} handleRemove={handleRemove} />
      )}
    </Box>
  )
}

export default AwaitingClients
