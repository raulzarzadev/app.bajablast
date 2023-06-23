'use client'

import { Button, Container } from '@mui/material'
import Link from 'next/link'
import { ReactNode } from 'react'
import { useSelectedLayoutSegment } from 'next/navigation'
const AdminLayout = ({ children }: { children: ReactNode }) => {
  const layoutSegment = useSelectedLayoutSegment()
  const segments = [
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
    }
  ]
  return (
    <Container component={'section'} className="max-w-md mx-auto">
      <nav>
        <ul className="flex w-full justify-between ">
          {segments.map(({ label, segment }) => (
            <li key={segment}>
              <Button
                variant={segment === layoutSegment ? 'contained' : 'text'}
                LinkComponent={Link}
                href={`/bb/admin/${segment}`}
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

export default AdminLayout
