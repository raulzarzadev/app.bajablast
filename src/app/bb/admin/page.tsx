'use client'
import withAuth from '@/HOCs/withAuth'
import ClientsNumbers from '@/components/ClientsNumbers'

const Page = () => {
  return (
    <div>
      <ClientsNumbers />
    </div>
  )
}

export default withAuth(Page, ['ADMIN', 'COORDINATOR'])
