import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

const ContentNotFound = ({ content }: { content?: undefined | null }) => {
  const router = useRouter()
  if (content === undefined) return <div>Loading</div>
  if (content === null)
    return (
      <Box>
        <Typography variant="h5" className="text-center my-16">
          Esta actividad ya no esta disponble
        </Typography>
        <Box className="text-center justify-center flex w-full">
          <Button
            onClick={(e) => {
              e.preventDefault()
              router.back()
            }}
            variant="outlined"
          >
            Regresar
          </Button>
        </Box>
      </Box>
    )
}

export default ContentNotFound
