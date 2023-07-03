export const ROLES = {
  client: 'CLIENT',
  collaborator: 'COLLABORATOR',
  coordinator: 'COORDINATOR'
} as const

export type Rol = (typeof ROLES)[keyof typeof ROLES]

export const roles = [
  { key: ROLES.client, label: 'Cliente' },
  { key: ROLES.collaborator, label: 'Colaborador' },
  { key: ROLES.coordinator, label: 'Coordinador' }
]
