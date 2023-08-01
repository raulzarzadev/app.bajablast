import { BaseType } from './base'
import { Client, Payment } from './user'

export type ReconciliationData = {
  cashier: { name: string; id: string } | null
  from: Date
  to: Date
}

export interface Reconciliation extends BaseType {
  total: number
  totalCash: number
  totalDollars: number
  totalCard: number
  dates: { from: Date | null; to: Date | null }
  cashier: { name: string; id: string } | null
  activities: Record<string, any[]>
  payments: Partial<Client['payment'] & { clientId: Client['id'] }>[]
  cancellations: any[]
  discounts: Partial<Client['payment'] & { clientId: Client['id'] }>[]
}
