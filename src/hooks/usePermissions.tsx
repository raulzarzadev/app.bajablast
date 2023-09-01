import { UserType } from '@/types/user'
import useUser from './useUser'

const usePermissions = (permissions: UserType['rol'][]): boolean => {
  const { user } = useUser()
  //const permissions: UserType['rol'][] = ['ADMIN', 'COORDINATOR']

  return permissions.includes(user?.rol || 'CLIENT')
}

export default usePermissions
