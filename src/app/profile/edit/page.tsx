'use client'
import ClientForm from '@/components/ClientForm'
import { updateUser } from '@/firebase/users'
import useUser from '@/hooks/useUser'
import { UserType } from '@/types/user'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

const Edit = () => {
  const { user } = useUser()
  const router = useRouter()
  const onSubmit = async (newUser: UserType) => {
    try {
      if (user?.id) {
        const res = await updateUser(user?.id, newUser)
        router.back()
        console.log(res)
      }
    } catch (error) {
      console.log({ error })
    }
  }
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
            handleSubmit={(user) => {
              onSubmit(user)
            }}
          />
        </Box>
      )}
    </div>
  )
}

export default Edit
