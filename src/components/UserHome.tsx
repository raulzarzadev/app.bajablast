'use client'

import useUser from '@/hooks/useUser'
import { dateMx } from '@/utils/utils-date'
import { Button } from '@mui/material'
import Link from 'next/link'

const UserHome = () => {
  const { user } = useUser()
  return (
    <div className="flex min-h-screen flex-col items-center  p-12 gap-5 text-center">
      <h2>Bienvenido a Baja Blast</h2>
      <section>
        <p>{user?.name}</p>
        <p>{dateMx(user?.birthday)}</p>
      </section>

      <Button LinkComponent={Link} href="/bb">
        Entrar al parque
      </Button>
    </div>
  )
}

export default UserHome
