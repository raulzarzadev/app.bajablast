import { parkAreas } from '@/CONST/park-areas'
import { Box, Button, Container, Typography } from '@mui/material'
import Link from 'next/link'

const ParkAreas = () => {
  return (
    <Container component={'section'} className="mt-10 max-w-md mx-auto">
      <Typography variant="h6" component={'h6'} className="">
        Areas
      </Typography>
      <Box
        component={'div'}
        className="grid grid-cols-2 sm:grid-cols-3 gap-2 place-content-center "
      >
        {parkAreas.map((area) => (
          <Link href={`${area.href}`} key={area.name} passHref>
            <Box
              component={'article'}
              className="flex flex-col gap-2 items-center justify-between py-4 px-1 text-center bg-slate-200 w-[120px] aspect-square rounded-md shadow-md "
            >
              <Typography component={'p'}>{area.name}</Typography>
            </Box>
          </Link>
        ))}
      </Box>
    </Container>
  )
}

export default ParkAreas
