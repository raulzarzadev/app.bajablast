import { UserContext } from '@/context/user'
import { UserType } from '@/types/user'
import { NextComponentType } from 'next'
import { useRouter } from 'next/navigation'
import { ReactNode, useContext } from 'react'

type WithAuthProps = {
  // Definir aquí las props adicionales que el HOC acepta y pasa al componente envuelto
}

type WithAuthComponentType<P = {}> = NextComponentType<P & WithAuthProps>
type ExtraValidation = (UserType['rol'] | 'isAdmin')[]
export function withAuth<P>(
  Component: WithAuthComponentType<P>,
  extraUserValidation: ExtraValidation
) {
  function WrappedComponent(hocProps: P) {
    const router = useRouter()
    const { user } = useContext(UserContext)
    if (user === undefined) return <>Loading...</>
    if (user === null) {
      router.replace('/')
      return <></>
    }
    // if extra User Validation include any start whith validation
    if (extraUserValidation?.length > 0) {
      const isValid = validateUser(extraUserValidation)
      if (!isValid) {
        router.replace('/')
        return <></>
      }
    }

    function validateUser(permissionsNecessaries: ExtraValidation): boolean {
      if (permissionsNecessaries.includes('isAdmin') && !user?.isAdmin)
        return false
      if (
        permissionsNecessaries.includes('COORDINATOR') &&
        !(user?.rol === 'COORDINATOR')
      )
        return false
      if (
        permissionsNecessaries.includes('COLLABORATOR') &&
        !(user?.rol === 'COLLABORATOR')
      )
        return false

      return true
    }

    //@ts-ignore
    return <Component {...hocProps} />
  }

  return WrappedComponent
}

export default withAuth
