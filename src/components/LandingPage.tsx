import { Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

const LandingPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-evenly p-2 text-center ">
      <div className="relative   aspect-[25/16] w-full max-w-md ">
        <Link href={'/bb'} passHref>
          <Image
            fill
            className="object-cover hover:scale-110 hover:filter transition-all duration-200  "
            src={'/icons/Logotipo-01.png'}
            alt="bajablast adventure park"
          />
        </Link>
      </div>
    </div>
  )
}

export default LandingPage
