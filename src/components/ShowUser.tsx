import { getUser } from '@/firebase/users'
import { UserType } from '@/types/user'
import { useState } from 'react'

const ShowUser = ({ userId }: { userId: UserType['id'] }) => {
  const [user, setUser] = useState<UserType | null | undefined>(null)
  return (
    <span>
      {user === undefined && <span>no encontrado</span>}
      {user === null && (
        <button
          onClick={(e) => {
            e.preventDefault()
            if (userId) {
              getUser(userId || '').then((res) => {
                setUser(res)
              })
            } else {
              setUser(undefined)
            }
          }}
        >
          mostrar
        </button>
      )}
      {user && <span>{user?.name}</span>}
    </span>
  )
}

export default ShowUser
