'use client'
import { NewClient } from '@/types/user'
import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import ClientsTable from '@/components/ClientsTable'
import { UserContext } from '@/context/user'

const Clients = () => {
  const { user } = useContext(UserContext)

  const [clients, setClients] = useState<NewClient[]>([])
  const [db, setDB] = useState([])
  useEffect(() => {
    const db = localStorage.getItem('tmp-bb-db')
    const oldDb = JSON.parse(db || '[]')
    setDB(oldDb)
    setClients(oldDb)
  }, [])

  const handleRemove = (clientId: NewClient['id']) => {
    const newClients = [
      ...db.filter((client: NewClient) => client?.id !== clientId)
    ]
    localStorage.setItem('tmp-bb-db', JSON.stringify(newClients))
    setClients(newClients)
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

export default Clients
