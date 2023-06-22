import { authStateChanged } from '@/firebase/auth'
import { app } from '@/firebase/main'
import { getAuth } from 'firebase/auth'
import { useEffect } from 'react'

const useAuth = () => {
  const auth = getAuth(app)
  const user = {}
  useEffect(() => {
    authStateChanged((res) => {
      console.log(res)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth])

  return { user }
}

export default useAuth
