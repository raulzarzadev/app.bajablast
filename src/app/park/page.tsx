'use client'
import withAuth from '@/HOCs/withAuth'
import BasicTabs from '@/components/BasicTabs'
import ClientsNumbers from '@/components/ClientsNumbers'
import ParkActivities from '@/components/ParkActivities'
import { ConfigurationCard } from '@/components/ParkConfigurations'
import { listenSelectedParkConfiguration } from '@/firebase/parkConfigurations'
import { ParkConfiguration } from '@/types/parkConfiguration'
import { Container } from '@mui/material'
import { useEffect, useState } from 'react'

const Page = () => {
  const [config, setConfig] = useState<ParkConfiguration | undefined>(undefined)
  useEffect(() => {
    listenSelectedParkConfiguration((configs: ParkConfiguration[]) =>
      setConfig(configs?.[0])
    )
  }, [])

  return (
    <BasicTabs
      tabs={[
        {
          label: 'Configuración',
          content: config ? <ConfigurationCard config={config} /> : 'Cargando'
        },
        {
          label: 'Actividades',
          content: <ParkActivities />
        },
        {
          label: 'Estadisticas',
          content: <ClientsNumbers />
        }
      ]}
    />
  )
}

export default withAuth(Page, ['COORDINATOR', 'ADMIN', 'COLLABORATOR'])
