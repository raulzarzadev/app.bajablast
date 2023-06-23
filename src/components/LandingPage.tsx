import { Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

const LandingPage = () => {
  return (
    <div>
      <div className="flex min-h-screen flex-col items-center justify-evenly p-2 text-center ">
        <div className="relative   aspect-[25/16] w-full max-w-md ">
          <Link href={'/bb'}>
            <Image
              fill
              className="object-cover hover:scale-110 hover:filter transition-all duration-200  "
              src={'/icons/Logotipo-01.png'}
              alt="bajablast adventure park"
            />
          </Link>
        </div>
        <span>
          {/* <Button LinkComponent={Link} href="/bb">
            Entrar al parque
          </Button> */}
        </span>
      </div>
    </div>
  )
}

export default LandingPage
