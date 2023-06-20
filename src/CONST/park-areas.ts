import { UserType } from '@/types/user'

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
    accessibleTo: ['COLLABORATOR', 'COORDINATOR'],
    href: '/bb/admin'
  },
  {
    name: 'Caja',
    description: 'Acceso de usuarios y administración de caja',
    accessibleTo: ['COLLABORATOR', 'COORDINATOR'],
    href: '/bb/cashbox'
  },
  {
    name: 'Colaboradores',
    description: 'Lista de colaboradores y administración de horarios',
    accessibleTo: ['COORDINATOR'],
    href: '/bb/collaborators'
  }
]
