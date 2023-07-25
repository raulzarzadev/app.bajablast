'use client'

import ClientsTable from './ClientsTable'
import useClients from '@/hooks/useClients'
import ExportDocument from './ExportDocument'

const ClientList = () => {
  const { clients } = useClients()

  return (
    <>
      <ExportDocument document={clients || []} fileName="Lista de clientes" />
      <ClientsTable clients={clients || []} />
    </>
  )
}

export default ClientList
