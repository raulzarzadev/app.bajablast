export const ACTIVITY_STATUS = {
  OPEN: { label: 'Abierto' },
  CLOSED: { label: 'Cerrado' },
  UPCOMING: { label: 'Proximamente' },
  HIDDEN: { label: 'Oculto' }
} as const

export type ActivityStatus = keyof typeof ACTIVITY_STATUS
