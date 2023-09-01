import ParkActivities, { ParkActivitiesPage } from '@/components/ParkActivities'
import PrincipalPage from '@/components/PrincipalPage'
import { getActivities } from '@/firebase/activities'
import { Suspense } from 'react'

async function getData(): Promise<ParkActivitiesPage> {
  const res = await getActivities().catch((err) => console.error(err))
  return (
    res?.map((a) => ({
      shortName: a.shortName,
      name: a.name,
      id: a.id,
      status: a.status,
      price: a.price,
      description: a.description
    })) || []
  )
}
export default async function Home() {
  const activities = await getData()

  return (
    <main data-test-id="home">
      <Suspense fallback={<section>Loading....</section>}>
        <PrincipalPage />
        <ParkActivities activities={activities} />
      </Suspense>
    </main>
  )
}
