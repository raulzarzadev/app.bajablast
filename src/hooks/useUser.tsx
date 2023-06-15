import { UserContext } from '@/context/user'
import { useContext } from 'react'

const useUser = () => {
  const { user, setUser } = useContext(UserContext)
  return { user, setUser }
}

export default useUser
