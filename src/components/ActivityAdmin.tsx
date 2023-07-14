import { Box, IconButton, Typography } from '@mui/material'
import ClientsChart from './ClientsChart'
import { useState } from 'react'
import ActivityForm from './ActivityForm'
import { ParkActivity } from '@/types/activities'
import CurrencySpan from './CurrencySpan'
import { updateActivity } from '@/firebase/activities'
import AppIcon from './AppIcon'
import { ACTIVITY_STATUS } from '@/CONST/activityStatus'

const ActivityAdmin = ({ activity }: { activity?: ParkActivity }) => {
  return (
    <div>
      <Typography variant="h4" className="text-center">
        Sección Admin
      </Typography>
      <ActivityInfo activity={activity} />
      <ClientsChart activityId={activity?.id} />
    </div>
  )
}

const ActivityInfo = ({ activity }: { activity?: ParkActivity }) => {
  const [editing, setEditing] = useState(false)

  return (
    <div>
      {editing ? (
        <>
          <Typography className="text-center my-4">Editar actividad</Typography>
          <div className="max-w-md mx-auto">
            <ActivityForm
              onCancel={() => {
                setEditing(false)
              }}
              activity={activity}
              onSubmit={async (activity) => {
                console.log({ activity })
                try {
                  if (activity.id) {
                    await updateActivity(activity.id, { ...activity })
                    setEditing(false)
                  }
                } catch (error) {
                  console.log({ error })
                }
              }}
            />
          </div>
        </>
      ) : (
        <div className="flex w-full justify-center">
          <ActivityDetails
            activity={activity}
            onEdit={() => {
              setEditing(true)
            }}
          />
        </div>
      )}
    </div>
  )
}
const ActivityDetails = ({
  onEdit,
  activity
}: {
  onEdit?: () => void
  activity?: ParkActivity
}) => {
  return (
    <Box className="my-4 flex items-start">
      {onEdit && (
        <IconButton
          onClick={(e) => {
            onEdit()
          }}
        >
          <AppIcon icon="edit" />
        </IconButton>
      )}
      <Box>
        <Typography>Nombre: {activity?.name}</Typography>
        <Typography>Nombre Corto: {activity?.shortName}</Typography>
        <Typography>Descripción: {activity?.description}</Typography>
        <Typography>
          Precio: <CurrencySpan quantity={activity?.price} />
        </Typography>
        <Typography>
          Estado actual: {ACTIVITY_STATUS[activity?.status || 'UPCOMING'].label}
        </Typography>
      </Box>
    </Box>
  )
}

export default ActivityAdmin
