'use client'

import ClientsTable from './ClientsTable'
import useClients from '@/hooks/useClients'

const ClientList = () => {
  const { clients } = useClients()
  return <ClientsTable clients={clients || []} />
}

export default ClientList
