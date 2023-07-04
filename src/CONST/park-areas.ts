import { UserType } from '@/types/user'
import { USER_ROL } from './user'

type ParkAreas = {
  name: string
  accessibleTo: UserType['rol'][]
  description: string
  href: string
}
export const parkAreas: ParkAreas[] = [
  {
    name: 'Administración',
    description: 'Acceso de usuarios y administración de caja',
    accessibleTo: [USER_ROL.COLLABORATOR, USER_ROL.COORDINATOR],
    href: '/bb/admin'
  },
  {
    name: 'Caja',
    description: 'Acceso de usuarios y administración de caja',
    accessibleTo: [USER_ROL.COLLABORATOR, USER_ROL.COORDINATOR],
    href: '/bb/cashbox'
  },
  {
    name: 'Colaboradores',
    description: 'Lista de colaboradores y administración de horarios',
    accessibleTo: [USER_ROL.COORDINATOR],
    href: '/bb/collaborators'
  }
]
