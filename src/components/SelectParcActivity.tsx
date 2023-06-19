import { activities } from '@/CONST/fake-activities'
import { Box, Button, Typography } from '@mui/material'
import { useContext } from 'react'
import { ParkActivity } from '@/types/activities'
import { NewClientContext } from '@/context/new-client'

const SelectParkActivity = () => {
  const { client, friends, setClient, setFriends } =
    useContext(NewClientContext)
  console.log({ client })
  return (
    <Box>
      <table>
        <tbody>
          <tr>
            <td>{client?.name || ''}</td>
            <td className="flex overflow-x-auto ">
              <SelectActivity
                selected={client?.activity?.name}
                activities={activities}
                onSelectedActivity={(activity) => {
                  const clientUpdated = {
                    ...client,
                    activity: {
                      name: activity.name,
                      price: activity.price
                    }
                  }

                  setClient?.({ ...clientUpdated })
                }}
              />
            </td>
          </tr>

          {friends?.map((friend, i) => (
            <tr key={friend?.id}>
              <td>{friend?.name || ''}</td>
              <td className="flex overflow-x-auto ">
                <SelectActivity
                  selected={friend?.activity?.name}
                  activities={activities}
                  onSelectedActivity={(activity) => {
                    const aux = [...friends]
                    aux.splice(i, 1, {
                      ...friend,
                      activity: {
                        name: activity.name,
                        price: activity.price
                      }
                    })
                    setFriends?.(aux)
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
        key={activity.name}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onSelectedActivity(activity)
        }}
      >
        <div
          className={`rounded-md shadow-md ${
            selected === activity.name && 'bg-blue-300 text-white'
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
