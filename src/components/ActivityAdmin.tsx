import { Box, IconButton, Typography } from '@mui/material'
import ClientsChart from './ClientsChart'
import { useState } from 'react'
import ActivityForm from './ActivityForm'
import { ParkActivity } from '@/types/activities'
import CurrencySpan from './CurrencySpan'
import { updateActivity } from '@/firebase/activities'
import AppIcon from './AppIcon'

const ActivityAdmin = ({ activity }: { activity?: ParkActivity }) => {
  return (
    <div>
      <Typography variant="h4" className="text-center">
        Sección Admin
      </Typography>
      <ActivityInfo activity={activity} />
      <ClientsChart />
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
          <ActivityForm
            onCancel={() => {
              setEditing(false)
            }}
            activity={activity}
            onSubmit={async (activity) => {
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
        </>
      ) : (
        <>
          <ActivityDetails
            activity={activity}
            onEdit={() => {
              setEditing(true)
            }}
          />
        </>
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
    <Box className="my-4">
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
      </Box>
    </Box>
  )
}

export default ActivityAdmin
