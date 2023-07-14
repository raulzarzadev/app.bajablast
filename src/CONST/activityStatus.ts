// export const ACTIVITY_STATUS = {
//   OPEN: { label: 'Abierto' },
//   CLOSED: { label: 'Cerrado' },
//   UPCOMING: { label: 'Proximamente' },
//   HIDDEN: { label: 'Oculto' }
// } as const

// export type ActivityStatus = keyof typeof ACTIVITY_STATUS
//
export enum ACTIVITY_STATUSES {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  UPCOMING = 'UPCOMING',
  HIDDEN = 'HIDDEN'
}
export const ACTIVITY_STATUS: Record<ACTIVITY_STATUSES, { label: string }> = {
  [ACTIVITY_STATUSES.OPEN]: { label: 'Abierto' },
  [ACTIVITY_STATUSES.CLOSED]: { label: 'Cerrado' },
  [ACTIVITY_STATUSES.UPCOMING]: { label: 'Proximamente' },
  [ACTIVITY_STATUSES.HIDDEN]: { label: 'Oculto' }
} as const

export type ActivityStatus = keyof typeof ACTIVITY_STATUSES
