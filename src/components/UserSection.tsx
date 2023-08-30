import { UserType } from '@/types/user'
import UserCard from './UserCard'

const UserSection = ({ user }: { user: UserType }) => {
  return (
    <section>
      <div className="flex w-full justify-center">
        <UserCard user={user} />
      </div>
      <div></div>
    </section>
  )
}

export default UserSection
