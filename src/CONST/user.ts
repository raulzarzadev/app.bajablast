export enum USER_ROL {
  CLIENT,
  COLLABORATOR,
  COORDINATOR
}
export const USER_ROLES: Record<USER_ROL, { label: string }> = {
  [USER_ROL.CLIENT]: { label: 'Cliente' },
  [USER_ROL.COLLABORATOR]: { label: 'Colaborador' },
  [USER_ROL.COORDINATOR]: { label: 'Coordinador' }
} as const

export type UserRol = keyof typeof USER_ROLES
