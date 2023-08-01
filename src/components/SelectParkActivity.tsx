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
    return (
      clients?.every((client) => !!client?.activity?.name) ||
      clients?.every((c) => (c?.activities?.length || 0) > 0)
    )
  }
  const openActivitiesAtFirst = (a: ParkActivity, b: ParkActivity) => {
    if (a.status === 'OPEN') return -1
    return 1
  }
  useEffect(() => {
    listenActivities((activities: ParkActivity[]) =>
      setActivities(activities.sort(openActivitiesAtFirst))
    )
  }, [])

  const [activities, setActivities] = useState<ParkActivity[]>([])
  const handleAddActivityToClient = (
    activity: ParkActivity,
    clientId?: string
  ) => {
    const newActivity = {
      id: activity?.id,
      name: activity?.name || '',
      price: activity?.price || 0
    }
    //* get client
    let client = clients?.find((c) => c.id === clientId)
    if (!client) return null
    //* client already have this activity
    const clientActivityAlreadyAdded = !!client?.activities?.find(
      (a) => a.id === activity.id
    )
    const clientActivities = [...(client.activities || [])]
    const clearActivities = clientActivities.filter((a) => a.id !== activity.id)

    if (clientActivityAlreadyAdded) {
      // remove activity
      return { ...client, activities: clearActivities }
    }
    // add activity
    clientActivities.push(newActivity)
    return { ...client, activities: clientActivities }
  }

  return (
    <Box>
      <Box className="">
        {clients?.map((client, i) => (
          <ClientSelectRow
            key={client?.id}
            onSelectActivity={(activityId) => {
              const aux = [...clients]
              const activity = activities.find((a) => a?.id === activityId)
              // if (!client.id) return console.log({ client }, 'no client.id')
              if (!activity) return console.log('no activity')

              const clientModified = handleAddActivityToClient(
                activity,
                client.id
              )
              console.log({ clientModified })
              if (!clientModified) return console.log('no client modified')
              // // clean clients
              aux.splice(i, 1, clientModified)
              setClients?.(aux)
              //aux.filter((c) => c.id !== client.id)
              // // add  client modified
              // aux.push(clientModified)
              // setClients?.(aux)
              return
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
      <div className="grid grid-flow-col overflow-x-auto h-36 gap-2 pb-2">
        {activities.map((activity) => (
          <Box key={activity.id} className="w-28 h-full">
            <SelectActivityCard
              activity={activity}
              onClick={() => onSelectActivity(activity.id)}
              selected={!!client?.activities?.find((a) => a.id === activity.id)}
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
        <Typography component={'p'} className="text-lg">
          <CurrencySpan quantity={activity.price} />
        </Typography>
        <Typography component={'p'} className="truncate text-xl">
          <span>{ACTIVITY_STATUS[activity.status].label}</span>
        </Typography>
      </div>
    </Box>
  )
}

export default SelectParkActivity
