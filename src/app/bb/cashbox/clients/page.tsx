'use client'
import { NewClient } from '@/types/user'
import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'
import { SetStateAction, useContext, useEffect, useState } from 'react'
import ClientsTable from '@/components/ClientsTable'
import { UserContext } from '@/context/user'
import { deleteUser, listenClients } from '@/firebase/users'
import withAuth from '@/HOCs/withAuth'

const Clients = () => {
  const { user } = useContext(UserContext)

  const [clients, setClients] = useState<NewClient[]>([])

  useEffect(() => {
    listenClients((clients: SetStateAction<NewClient[]>) => {
      console.log({ clients })
      setClients(clients)
    })
  }, [])

  const handleRemove = async (clientId: NewClient['id']) => {
    try {
      await deleteUser(clientId || '')
    } catch (error) {
      console.error(error)
    }
  }

  const awaitingClients = clients.filter((client) => !client.payment)
  const paidClients = clients.filter((client) => !!client.payment)

  return (
    <Box
      component={'section'}
      className="flex flex-col justify-center items-center pt-12 max-w-md mx-auto"
    >
      <Box className="flex flex-col gap-4 mt-4">
        <Button LinkComponent={Link} href="clients/new">
          Nuevo cliente
        </Button>
      </Box>
      <Typography component={'h6'} variant="h6" className="w-full text-left">
        En espera
      </Typography>
      {awaitingClients.length === 0 ? (
        <Typography variant="h6">Aún no hay clientes en espera</Typography>
      ) : (
        <ClientsTable clients={awaitingClients} handleRemove={handleRemove} />
      )}

      {user?.rol === 'COORDINATOR' && (
        <>
          <Typography
            component={'h6'}
            variant="h6"
            className="w-full text-left"
          >
            Pagos
          </Typography>
          {paidClients.length === 0 ? (
            <Typography variant="h6">Aún no hay pagos realizados</Typography>
          ) : (
            <ClientsTable clients={paidClients} />
          )}
        </>
      )}
    </Box>
  )
}

export default withAuth(Clients)
