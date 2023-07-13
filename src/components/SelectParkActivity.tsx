import { Box, Button, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { ParkActivity } from '@/types/activities'
import { NewClientContext } from '@/context/new-client'
import { Friend, NewClient } from '@/types/user'
import CurrencySpan from './CurrencySpan'
import { listenActivities } from '@/firebase/activities'
import { ACTIVITY_STATUS, ACTIVITY_STATUSES } from '@/CONST/activityStatus'

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
    return clients?.every((client) => !!client?.activity?.name)
  }

  useEffect(() => {
    listenActivities(setActivities)
  }, [])

  const [activities, setActivities] = useState([])

  return (
    <Box>
      <Box className="flex overflow-x-auto py-2">
        {clients?.map((client, i) => (
          <div key={client?.id || i} className={``}>
            <Typography variant="h6" className="text-center">
              {client?.name || ''}
            </Typography>
            <div className="flex overflow-x-auto ">
              <SelectActivity
                selected={client?.activity?.name}
                activities={activities}
                onSelectedActivity={(activity) => {
                  const aux = [...clients]
                  if (activity === null) {
                    aux.splice(i, 1, {
                      ...client,
                      activity: null
                    })
                    setClients?.(aux)
                  } else {
                    aux.splice(i, 1, {
                      ...client,
                      activity: {
                        id: activity.id,
                        name: activity.name,
                        price: activity.price
                      }
                    })
                    setClients?.(aux)
                  }
                }}
              />
            </div>
          </div>
        ))}
      </Box>
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
            const cleanClients = clearClientsActivity(clients || [])
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
const hideActivity = (status: ParkActivity['status']) => {
  const activities: ParkActivity['status'][] = [
    ACTIVITY_STATUSES.CLOSED,
    ACTIVITY_STATUSES.HIDDEN,
    ACTIVITY_STATUSES.UPCOMING
  ]
  return activities.includes(status)
}
const SelectActivity = ({
  activities = [],
  onSelectedActivity,
  selected = ''
}: {
  activities: ParkActivity[]
  onSelectedActivity: (activity: ParkActivity | null) => void
  selected?: string
}) => (
  <>
    {activities.map((activity) => (
      <button
        className={` 
        w-28 aspect-video  m-1 mt-0 rounded-md shadow-md 
        ${selected === activity.name && 'bg-blue-300 text-white'}
        ${hideActivity(activity.status) && ' opacity-25 cursor-not-allowed'}
        `}
        key={activity.name}
        onClick={(e) => {
          if (hideActivity(activity.status)) return
          e.preventDefault()
          e.stopPropagation()
          if (selected === activity.name) {
            onSelectedActivity(null)
          } else {
            onSelectedActivity(activity)
          }
        }}
      >
        <div className="text-center flex flex-col items-center justify-center">
          <Typography variant="caption" component={'p'}>
            {activity.name}
          </Typography>
          <Typography variant="caption" component={'p'}>
            <CurrencySpan quantity={activity.price} />
          </Typography>
          <Typography variant="caption" component={'p'}>
            {ACTIVITY_STATUS[activity.status].label}
          </Typography>
        </div>
      </button>
    ))}
  </>
)

export default SelectParkActivity
