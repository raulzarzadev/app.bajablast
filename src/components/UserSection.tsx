import { UserType } from '@/types/user'
import UserCard from './UserCard'
import BasicSquare from './BasicSquare'
import { Container } from '@mui/material'
import Link from 'next/link'

const UserSection = ({ user }: { user: UserType }) => {
  return (
    <Container component="section" className="max-w-2xl mx-auto">
      <div className="flex w-full justify-center">
        <UserCard user={user} />
      </div>
      <div className="grid grid-flow-row sm:grid-flow-col gap-2 ">
        <Link href="/cashbox">
          <BasicSquare content={<span className="text-2xl">Caja</span>} />
        </Link>
        <Link href="/park">
          <BasicSquare content={<span className="text-2xl">Parque</span>} />
        </Link>
        <Link href="/personal">
          <BasicSquare content={<span className="text-2xl">Personal</span>} />
        </Link>
      </div>
    </Container>
  )
}

export default UserSection
