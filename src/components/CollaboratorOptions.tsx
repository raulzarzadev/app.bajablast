import { Box, IconButton, Typography } from '@mui/material'

const CollaboratorOptions = () => {
  return (
    <Box component="section" aria-label="collaborator-section">
      <Typography className="text-center">Horario</Typography>
      <Box className="flex w-full justify-evenly " aria-label="select-day">
        <IconButton className="w-1/5 ">Ayer</IconButton>
        <IconButton className="w-1/5 ">Hoy</IconButton>
        <IconButton className="w-1/5 ">Mañana</IconButton>
      </Box>
      <Box className="flex w-full justify-evenly ">
        <IconButton className="w-1/5 " aria-label="data-day">
          12/feb
        </IconButton>
        <IconButton className="w-1/5 " aria-label="data-day">
          13/feb
        </IconButton>
        <IconButton className="w-1/5 " aria-label="data-day">
          14/feb
        </IconButton>
      </Box>
    </Box>
  )
}

export default CollaboratorOptions
