'use client'
import withAuth from '@/HOCs/withAuth'
import CashboxReconciliation from '@/components/CashboxReconciliation'

const page = () => {
  return (
    <>
      <CashboxReconciliation />
    </>
  )
}

export default withAuth(page, ['ADMIN'])
