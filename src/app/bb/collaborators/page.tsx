'use client'
import withAuth from '@/HOCs/withAuth'
import { Container, Typography } from '@mui/material'

const Page = () => {
  return (
    <div>
      <Container className="max-w-md mx-auto">
        <Typography className="text-center" variant="h4">
          Colaboradores
        </Typography>
      </Container>
    </div>
  )
}

export default withAuth(Page)
