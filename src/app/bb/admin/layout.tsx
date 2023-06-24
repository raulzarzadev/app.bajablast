'use client'

import { Button, Container } from '@mui/material'
import Link from 'next/link'
import { ReactNode } from 'react'
import { useSelectedLayoutSegment } from 'next/navigation'
import withAuth from '@/HOCs/withAuth'
const AdminLayout = ({ children }: { children?: ReactNode }) => {
  const layoutSegment = useSelectedLayoutSegment()
  const segments = [
    {
      label: 'Inicio',
      segment: ''
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
        <ul className="flex w-full justify-between ">
          {segments.map(({ label, segment }) => (
            <li key={segment}>
              <Button
                variant={
                  segment === (layoutSegment ?? '') ? 'contained' : 'text'
                }
                LinkComponent={Link}
                href={`/bb/admin/${segment ? segment : ''}`}
              >
                {label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      <div>{children}</div>
    </Container>
  )
}

export default withAuth(AdminLayout)
