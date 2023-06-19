import { activities } from '@/CONST/fake-activities'
import { Box, Button, Typography } from '@mui/material'
import { useContext } from 'react'
import { ParkActivity } from '@/types/activities'
import { NewClientContext } from '@/context/new-client'
import { Friend, NewClient } from '@/types/user'

const SelectParkActivity = ({
  clients,
  setClients,
  handleClear,
  handleFinish
}: {
  clients?: NewClient[]
  setClients?: (clients: (NewClient | Friend)[]) => void
  handleClear?: () => void
  handleFinish?: () => void
}) => {
  const allClientsHaveActivity = (clients: NewClient[] | undefined) => {
    return clients?.every((client) => !!client.activity?.name)
  }
  console.log(clients)
  return (
    <Box>
      <div>
        <div>
          {clients?.map((client, i) => (
            <div key={(client?.name || '') + i}>
              <Typography variant="h6" className="text-center">
                {client?.name || ''}
              </Typography>
              <div className="flex overflow-x-auto ">
                <SelectActivity
                  selected={client?.activity?.name}
                  activities={activities}
                  onSelectedActivity={(activity) => {
                    const aux = [...clients]
                    aux.splice(i, 1, {
                      ...client,
                      activity: {
                        name: activity.name,
                        price: activity.price
                      }
                    })
                    setClients?.(aux)
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex justify-evenly">
        <Button
          onClick={() => {
            handleClear?.()
            const clearClientsActivity = (clients: NewClient[]) => {
              return clients.map((client) => {
                delete client.activity
                return { ...client }
              })
            }
            const cleanClients = clearClientsActivity(clients)
            console.log({ cleanClients })
            setClients?.(cleanClients)
          }}
        >
          Limpiar
        </Button>
        <Button
          disabled={!allClientsHaveActivity(clients)}
          onClick={() => {
            handleFinish?.()
          }}
        >
          Listo
        </Button>
      </div>
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
        className=" w-22 aspect-video text-center flex flex-col items-center justify-center m-1 mt-0"
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
