import { Box, Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { ParkActivity } from '@/types/activities'
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

  const [activities, setActivities] = useState<ParkActivity[]>([])

  return (
    <Box>
      <Box className="">
        {clients?.map((client, i) => (
          <ClientSelectRow
            key={client?.id}
            onSelectActivity={(activityId) => {
              const aux = [...clients]
              const activity = activities.find((a) => a?.id === activityId)
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
                    id: activity?.id,
                    name: activity?.name || '',
                    price: activity?.price || 0
                  }
                })
                setClients?.(aux)
              }
            }}
            client={client}
            activities={activities}
          />
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

const ClientSelectRow = ({
  client,
  activities,
  onSelectActivity
}: {
  activities: ParkActivity[]
  client: NewClient
  onSelectActivity: (activityId: ParkActivity['id']) => void
}) => {
  return (
    <Box>
      <Typography variant="h6" className="text-start">
        {client?.name || ''}
      </Typography>
      <div className="grid grid-flow-col overflow-x-auto h-32 gap-4 pb-2">
        {activities.map((activity) => (
          <Box key={activity.id} className="w-32 h-full">
            <SelectActivityCard
              activity={activity}
              onClick={() => onSelectActivity(activity.id)}
              selected={client?.activity?.id === activity.id}
            />
          </Box>
        ))}
      </div>
    </Box>
  )
}

const SelectActivityCard = ({
  activity,
  onClick,
  selected
}: {
  activity: ParkActivity
  onClick: (activityId: ParkActivity['id']) => void
  selected: boolean
}) => {
  const hideActivity = (status: ParkActivity['status']) => {
    const activities: ParkActivity['status'][] = [
      ACTIVITY_STATUSES.CLOSED,
      ACTIVITY_STATUSES.HIDDEN,
      ACTIVITY_STATUSES.UPCOMING
    ]
    return activities.includes(status)
  }
  const hidden = hideActivity(activity.status)
  return (
    <Box
      className={` 
      w-full h-full border  m-1 mt-0 rounded-md shadow-md 
        ${selected && 'bg-blue-300 text-white'}
        ${hidden && 'opacity-25 cursor-not-allowed'}
        `}
      key={activity.name}
      onClick={(e) => {
        if (hidden === false) {
          onClick(activity.id)
        }
      }}
    >
      <div className="text-center flex flex-col  justify-between h-full w-full">
        <Typography variant="subtitle1" component={'p'}>
          {activity.name}
        </Typography>
        <Typography variant="caption" component={'p'}>
          <CurrencySpan quantity={activity.price} />
        </Typography>
        <Typography variant="caption" component={'p'}>
          {ACTIVITY_STATUS[activity.status].label}
        </Typography>
      </div>
    </Box>
  )
}

export default SelectParkActivity
