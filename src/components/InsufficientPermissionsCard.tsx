import { Button, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

const InsufficientPermissionsCard = () => {
  const router = useRouter()
  return (
    <div className="flex w-full min-h-screen justify-center items-center  flex-col border">
      <Typography component={'p'} className="whitespace-pre-line text-center">
        {`No tienes permisos suficientes. 
    Consultalo con el administrador.`}
      </Typography>
      <div>
        <Button
          onClick={(e) => {
            router.back()
          }}
        >
          Atras
        </Button>
      </div>
    </div>
  )
}

export default InsufficientPermissionsCard
