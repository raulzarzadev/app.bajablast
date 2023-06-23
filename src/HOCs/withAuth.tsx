import { UserContext } from '@/context/user'
import { NextComponentType } from 'next'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

type WithAuthProps = {
  // Definir aquí las props adicionales que el HOC acepta y pasa al componente envuelto
}

type WithAuthComponentType<P = {}> = NextComponentType<P & WithAuthProps>

export function withAuth<P>(Component: WithAuthComponentType<P>) {
  function WrappedComponent(hocProps: P) {
    const router = useRouter()
    const { user } = useContext(UserContext)
    if (user === undefined) return <>Loading...</>
    if (user === null) {
      router.replace('/')
      return <></>
    }

    //@ts-ignore
    return <Component {...hocProps} />
  }

  return WrappedComponent
}

export default withAuth
