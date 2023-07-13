import { Client } from '@/types/user'
import calculateReconciliation from '@/utils/calculateReconciliation'
import { expect, it } from 'vitest'
const clients: Partial<Client>[] = [
  {
    id: '1',
    activity: {
      id: '1231',
      name: 'activity1',
      price: 10
    },
    payment: {
      method: 'cash',
      amount: 10,
      date: new Date(),
      created: {
        at: new Date(),
        by: 'sd'
      },
      discount: 0,
      dollarPrice: 16
    }
  },
  {
    id: '2',
    activity: {
      name: 'activity2',
      price: 20,
      id: '1232'
    },
    payment: {
      method: 'usd',
      amount: 20,
      created: {
        at: new Date(),
        by: 'sd'
      },
      discount: 0,
      dollarPrice: 16,
      date: new Date()
    }
  }
]
// Tests that the function returns an object with the correct total amount
it('test_happy_path_returns_correct_total', () => {
  const result = calculateReconciliation(clients)
  expect(result.total).toBe(30)
})

// Tests that the function groups activities by name
it('test_happy_path_groups_activities_by_name', () => {
  const result = calculateReconciliation(clients)
  expect(result.activities).toEqual({
    activity1: [
      {
        name: 'activity1',
        price: 10
      }
    ],
    activity2: [
      {
        name: 'activity2',
        price: 20
      }
    ]
  })
})

// Tests that the function handles empty clients array
it('test_edge_case_handles_empty_clients_array', () => {
  const clients: Client[] = []
  const result = calculateReconciliation(clients)
  expect(result.total).toBe(0)
})

// Tests that the function handles null reconciliationData
it('test_edge_case_handles_null_reconciliation_data', () => {
  const result = calculateReconciliation(clients)
  expect(result.total).toBe(30)
})