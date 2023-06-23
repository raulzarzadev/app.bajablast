import { parkAreas } from '@/CONST/park-areas'
import { Box, Button, Container, Typography } from '@mui/material'
import Link from 'next/link'

const ParkAreas = () => {
  return (
    <Container component={'section'} className="mt-10 max-w-md mx-auto">
      <Typography variant="h6" component={'h6'} className="">
        Actividades
      </Typography>
      <Box component={'div'} className="flex gap-2 flex-wrap justify-start">
        {parkAreas.map((area) => (
          <Button href={`${area.href}`} key={area.name} LinkComponent={Link}>
            <Box
              component={'article'}
              className="truncate flex flex-col gap-2 items-center justify-between  py-4 px-1 text-center bg-slate-200 w-[160px] aspect-square rounded-md shadow-md "
            >
              <Typography component={'p'}>{area.name}</Typography>
            </Box>
          </Button>
        ))}
      </Box>
    </Container>
  )
}

export default ParkAreas
