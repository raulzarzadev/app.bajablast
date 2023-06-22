'use client'
import ClientForm from '@/components/ClientForm'
import useUser from '@/hooks/useUser'
import { Box, Typography } from '@mui/material'

const Edit = () => {
  const { user } = useUser()
  return (
    <div className="my-8">
      {user && (
        <Box>
          <Typography variant="h4" className="text-center my-4">
            Editar usuario
          </Typography>
          <ClientForm
            client={user}
            editRol={!!user.isAdmin}
            handleSubmit={(e) => {
              console.log(e)
            }}
          />
        </Box>
      )}
    </div>
  )
}

export default Edit
