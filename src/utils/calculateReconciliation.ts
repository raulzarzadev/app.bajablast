import { Reconciliation, ReconciliationData } from '@/types/reconciliations'
import { Client } from '@/types/user'
import asNumber from './asNumber'
import { ClientActivity, ParkActivity } from '@/types/activities'

const allClientsActivities = (clients: Partial<Client>[]): ClientActivity[] => {
  let res: ClientActivity[] = []
  clients.forEach((client) => {
    client.activity && res.push({ ...client.activity })
    client.activities?.forEach((activity) => res.push(activity))
    client.friends?.forEach((friend) => {
      friend.activity && res.push(friend.activity)
      friend.activities?.forEach((activity) => res.push(activity))
    })
  })
  return res
}
const calculateReconciliation = (
  clients: Partial<Client>[],
  reconciliationData?: ReconciliationData
): Partial<Reconciliation> => {
  const cashier = reconciliationData?.cashier || null
  const activities = allClientsActivities(clients)

  const groupedActivities: Record<string, any[]> = {}
  activities.forEach((activity) => {
    const name = activity?.name || ''
    if (!groupedActivities[name]) {
      groupedActivities[name] = []
    }
    groupedActivities[name].push(activity)
  })

  const totalCash = clients.reduce((acc, client) => {
    return (
      //TODO: should add discount?
      acc + (client?.payment?.method === 'cash' ? client.payment?.amount : 0)
    )
  }, 0)
  const totalDollars = clients.reduce((acc, client) => {
    return (
      //TODO: should add discount?
      acc + (client?.payment?.method === 'usd' ? client.payment?.amount : 0)
    )
  }, 0)
  const totalCard = clients.reduce((acc, client) => {
    return (
      //TODO: should add discount?
      acc + (client?.payment?.method === 'card' ? client.payment?.amount : 0)
    )
  }, 0)
  const total = totalCash + totalDollars + totalCard
  const payments = clients.map((client) => {
    return { clientId: client.id, ...client?.payment }
  })
  const cancellations = clients.filter((c) => c.payment?.isCancelled)
  const totalCancellations = cancellations.reduce(
    (acc, client) => acc + asNumber(client?.payment?.amount),
    0
  )
  return {
    dates: {
      from: reconciliationData?.from || null,
      to: reconciliationData?.to || null
    },
    total,
    totalCash,
    totalDollars,
    totalCard,
    cashier,
    activities: groupedActivities,
    payments,
    cancellations
  }
}
export default calculateReconciliation
