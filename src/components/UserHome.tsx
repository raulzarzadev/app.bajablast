'use client'

import Image from 'next/image'
import Link from 'next/link'

export const imageLoader = () => {
  return '/icons/Logotipo-01.png'
}
const UserHome = () => {
  return (
    <div className="flex h-full min-h-[50vh] flex-col items-center justify-start p-2 mt-16 text-center ">
      <div className="relative   aspect-[25/16] w-full max-w-md ">
        <Link href={'/bb'} passHref>
          <Image
            loader={imageLoader}
            fill
            className="object-cover hover:scale-110 hover:filter transition-all duration-200  "
            src={'/icons/Logotipo-01-254px.png'}
            alt="bajablast adventure park"
          />
        </Link>
      </div>
    </div>
  )
}

export default UserHome
