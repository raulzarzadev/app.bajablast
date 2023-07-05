export enum USER_ROL {
  CLIENT = 'CLIENT',
  COLLABORATOR = 'COLLABORATOR',
  COORDINATOR = 'COORDINATOR',
  ADMIN = 'ADMIN'
}
export const USER_ROLES: Record<USER_ROL, { label: string }> = {
  [USER_ROL.CLIENT]: { label: 'Cliente' },
  [USER_ROL.COLLABORATOR]: { label: 'Colaborador' },
  [USER_ROL.COORDINATOR]: { label: 'Coordinador' },
  [USER_ROL.ADMIN]: { label: 'Admin' }
} as const

export type UserRol = keyof typeof USER_ROL
