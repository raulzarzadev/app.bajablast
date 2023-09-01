'use client'
import { UserRol } from '@/CONST/user'
import InsufficientPermissionsCard from '@/components/InsufficientPermissionsCard'
import { UserContext } from '@/context/user'
import { UserType } from '@/types/user'
import { Button, Typography } from '@mui/material'
import { NextComponentType } from 'next'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

type WithAuthProps = {
  // Definir aquí las props adicionales que el HOC acepta y pasa al componente envuelto
}

type WithAuthComponentType<P = {}> = NextComponentType<P & WithAuthProps>
export type ExtraValidation = UserRol[]
const a: ExtraValidation = []
export function withAuth<P>(
  Component: WithAuthComponentType<P>,
  extraUserValidation?: ExtraValidation
) {
  function WrappedComponent(hocProps: P) {
    const router = useRouter()
    const { user } = useContext(UserContext)
    if (user === undefined) return <>Loading...</>
    if (user === null) {
      // router.replace('/')
      return <>You should be logged</>
    }
    // if extra User Validation include any start whith validation
    if (extraUserValidation && extraUserValidation?.length > 0) {
      const isValid = validateUser(user.rol, extraUserValidation)
      if (!isValid) {
        //
        // router.replace('/')
        return <InsufficientPermissionsCard />
      }
    }

    //@ts-ignore
    return <Component {...hocProps} />
  }

  return WrappedComponent
}
export function validateUser(
  userRol: UserType['rol'],
  permissions?: ExtraValidation,
  ops?: { admin?: boolean }
): boolean {
  const isClient = userRol === 'CLIENT'
  const isCollaborator = userRol === 'COLLABORATOR'
  const isCoordinator = userRol === 'COORDINATOR'
  const isAdmin = userRol === 'ADMIN' || ops?.admin

  //* Should return true if  user is admin or permissions ar empty or undefined
  if (isAdmin) return true
  if (!permissions) return true
  if (permissions?.length === 0) return true

  //* Should return true if  user is client and permissions are client
  if (permissions?.includes('CLIENT') && isClient) return true

  //* Should return true if  user is collaborator  and permissions are collaborator
  if (
    permissions?.includes('COLLABORATOR') &&
    (isCollaborator || isCoordinator || isAdmin)
  )
    return true
  if (permissions?.includes('COORDINATOR') && (isCoordinator || isAdmin))
    return true
  if (permissions?.includes('ADMIN') && isAdmin) return true

  return false
}
export default withAuth
