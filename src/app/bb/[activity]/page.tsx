import ActivityPage from '@/components/ActivityPage'

const activity = ({ params }: { params: { activity: string } }) => {
  return (
    <div>
      <ActivityPage activityId={params?.activity} />
    </div>
  )
}

export default activity
