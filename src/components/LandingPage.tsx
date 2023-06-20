import { Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

const LandingPage = () => {
  return (
    <div>
      <div className="flex min-h-screen flex-col items-center justify-evenly p-2 text-center ">
        <div className="relative   aspect-[25/16] w-full max-w-md ">
          <Image
            fill
            className="object-cover"
            src={'/logos/bb-adventure-park.png'}
            alt="bajablast adventure park"
          />
          p
        </div>
        <span>
          <Button LinkComponent={Link} href="/bb">
            Entrar al parque
          </Button>
        </span>
      </div>
    </div>
  )
}

export default LandingPage
