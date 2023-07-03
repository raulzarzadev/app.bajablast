export const ACTIVITY_STATUS = {
  HIDDEN: { label: 'Oculto' },
  OPEN: { label: 'Abierto' },
  CLOSED: { label: 'Cerrado' },
  UPCOMING: { label: 'Proximamente' }
} as const

export type ActivityStatus = keyof typeof ACTIVITY_STATUS
