import { UserContext } from '@/context/user'
import { authStateChanged } from '@/firebase/auth'
import { UserType } from '@/types/user'
import { useContext, useEffect } from 'react'

const useAuth = () => {
  const { setUser } = useContext(UserContext)
  useEffect(() => {
    authStateChanged((res: UserType | null) => {
      setUser(res)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useAuth
