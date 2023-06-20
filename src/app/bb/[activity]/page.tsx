import ActivityPage from '@/components/ActivityPage'
import useUser from '@/hooks/useUser'

const activity = ({ params }: { params: { activity: string } }) => {
  console.log({ params })
  return (
    <div>
      <ActivityPage activityId={params?.activity} />
    </div>
  )
}

export default activity
