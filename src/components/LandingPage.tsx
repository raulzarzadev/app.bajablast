import { Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

const LandingPage = () => {
  return (
    <div>
      <div className="flex min-h-screen flex-col items-center justify-evenly p-2 text-center ">
        <Typography variant="body1" component={'header'}>
          Bienvenidos a
        </Typography>
        <Typography variant="h2" component={'h1'}>
          Baja Blast
        </Typography>
        <Typography variant="h4" component={'header'}>
          Ingresa para descubrir más
        </Typography>
        <div className="relative   aspect-[25/16] w-full max-w-md ">
          <Image
            fill
            className="object-cover"
            src={'/logos/bb-adventure-park.png'}
            alt="bajablast adventure park"
          />
          p
        </div>
        <span></span>
      </div>
    </div>
  )
}

export default LandingPage
