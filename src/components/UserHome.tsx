'use client'

import useUser from '@/hooks/useUser'
import { dateMx } from '@/utils/utils-date'
import { Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

const UserHome = () => {
  const { user } = useUser()
  return (
    <div className="flex min-h-screen flex-col items-center justify-start p-2 mt-16 text-center ">
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
    </div>
  )
}

export default UserHome
