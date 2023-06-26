import { Box, IconButton, Typography } from '@mui/material'
import ClientsChart from './ClientsChart'
import IconEdit from './icons/edit'
import { useState } from 'react'
import ActivityForm from './ActivityForm'
import { ParkActivity } from '@/types/activities'
import { activities } from '@/CONST/fake-activities'
import CurrencySpan from './CurrencySpan'

const ActivityAdmin = () => {
  const activity = activities[0]
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

const ActivityInfo = ({ activity }: { activity: ParkActivity }) => {
  const [editing, setEditing] = useState(false)

  return (
    <div>
      {editing ? (
        <>
          <Typography>Edit</Typography>
          <ActivityForm
            onSubmit={(activity) => {
              console.log({ activity })
              setEditing(false)
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
  activity: ParkActivity
}) => {
  return (
    <Box className="my-4">
      {onEdit && (
        <IconButton
          onClick={(e) => {
            onEdit()
          }}
        >
          <IconEdit />
        </IconButton>
      )}
      <Box>
        <Typography>Nombre: {activity.name}</Typography>
        <Typography>Nombre Corto: {activity.shortName}</Typography>
        <Typography>Descripción: {activity.description}</Typography>
        <Typography>
          Precio: <CurrencySpan quantity={activity.price} />
        </Typography>
      </Box>
    </Box>
  )
}

export default ActivityAdmin
