import { Reconciliation, ReconciliationData } from '@/types/reconciliations'
import { Client } from '@/types/user'
import asNumber from './asNumber'

const calculateReconciliation = (
  clients: Partial<Client>[],
  reconciliationData?: ReconciliationData
): Partial<Reconciliation> => {
  const cashier = reconciliationData?.cashier || null
  const activities = clients
    .map((client) => {
      const friendsActivities =
        client?.friends?.map((friend) => {
          return friend?.activity
        }) || []
      return [client.activity, ...friendsActivities]
    })
    .flat()

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
