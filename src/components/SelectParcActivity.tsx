import { activities } from '@/CONST/fake-activities'
import { Box, Button, Typography } from '@mui/material'
import { useContext } from 'react'
import { ParkActivity } from '@/types/activities'
import { NewClientContext } from '@/context/new-client'

const SelectParkActivity = () => {
  const { client, friends, setClient, setFriends } =
    useContext(NewClientContext)
  console.log({ friends })
  return (
    <Box>
      <table>
        <tbody>
          <tr>
            <td>{client?.name || ''}</td>
            <td className="flex overflow-x-auto ">
              <SelectActivity
                activities={activities}
                onSelectedActivity={(activity) => {
                  console.log({ client, activity })
                  setClient?.({
                    ...client,
                    activity: {
                      activityId: activity.activityId,
                      price: activity.price
                    }
                  })
                }}
              />
            </td>
          </tr>

          {friends?.map((friend, i) => (
            <tr key={friend.id}>
              <td>{friend?.name || ''}</td>
              <td className="flex overflow-x-auto ">
                <SelectActivity
                  selected={friend?.activity?.activityId}
                  activities={activities}
                  onSelectedActivity={(activity) => {
                    friends.splice(i, 1, {
                      ...friend,
                      activity: {
                        activityId: activity.activityId,
                        price: activity.price
                      }
                    })
                    setFriends?.(friends)
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  )
}

const SelectActivity = ({
  activities = [],
  onSelectedActivity,
  selected = ''
}: {
  activities: ParkActivity[]
  onSelectedActivity: (activity: ParkActivity) => void
  selected?: string
}) => (
  <>
    {activities.map((activity) => (
      <Button
        className=" w-22 aspect-video text-center flex flex-col items-center justify-center m-1"
        key={activity.activityId}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onSelectedActivity(activity)
        }}
      >
        <div
          className={`border-2 ${
            selected === activity.activityId
              ? 'border-black'
              : 'border-transparent'
          }`}
        >
          <Typography variant="caption" component={'p'}>
            {activity.name}
          </Typography>
          <Typography variant="caption" component={'p'}>
            ${activity.price.toFixed(2)}
          </Typography>
        </div>
      </Button>
    ))}
  </>
)

export default SelectParkActivity
