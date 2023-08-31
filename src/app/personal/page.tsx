'use client'
import withAuth from '@/HOCs/withAuth'
import useCollaborators from '@/hooks/useCollaborators'
import CollaboratorsList from '@/components/CollaboratorsTable'
import { Container, Typography } from '@mui/material'

const Page = () => {
  const { collaborators } = useCollaborators()
  return (
    <Container className="mt-4">
      <Typography variant="h4" className="text-center">
        Usuarios registrados
      </Typography>
      <CollaboratorsList collaborators={collaborators} />
    </Container>
  )
}

export default withAuth(Page, ['ADMIN', 'COLLABORATOR', 'COORDINATOR'])
