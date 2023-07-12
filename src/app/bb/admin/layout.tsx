'use client'

import { Box, Container } from '@mui/material'
import { ReactNode } from 'react'
import { useSelectedLayoutSegment } from 'next/navigation'
import withAuth from '@/HOCs/withAuth'
import LinkApp from '@/components/LinkApp'
const AdminLayout = ({ children }: { children?: ReactNode }) => {
  const layoutSegment = useSelectedLayoutSegment()
  const segments = [
    {
      label: 'dashboard',
      segment: ''
    },
    {
      label: 'Caja',
      segment: 'cashbox'
    },
    {
      label: 'Actividades',
      segment: 'activities'
    },
    {
      label: 'Colaboradores',
      segment: 'collaborators'
    },
    {
      label: 'Clientes',
      segment: 'clients'
    },
    {
      label: 'Parque',
      segment: 'park'
    }
  ]

  return (
    <Container component={'section'} className=" mx-auto mt-2">
      <nav>
        <ul className="flex w-full justify-between flex-wrap">
          {segments.map(({ label, segment }) => (
            <li key={segment} className="m-1">
              <LinkApp
                href={`/bb/admin/${segment ? segment : ''}`}
                label={label}
                selected={segment === layoutSegment}
              />
            </li>
          ))}
        </ul>
      </nav>
      <Box>{children}</Box>
    </Container>
  )
}

export default withAuth(AdminLayout)
