import { ParkActivity } from '@/types/activities'
import { Box, IconButton, Typography } from '@mui/material'
import AppIcon from './AppIcon'
import { useState } from 'react'
import OperatorForm from './OperatorForm'

const ActivityCollaboratorsSchedule = ({
  collaborators
}: {
  collaborators: ParkActivity['operators']
}) => {
  console.log({ collaborators })
  // const collaborators: ParkActivity['operators'] = [
  //   {
  //     name: 'Fernando Faez',
  //     id: '1',
  //     schedule: {
  //       Monday: null,
  //       Tuesday: '12:00 - 14:00',
  //       Wednesday: '12:00 - 14:00',
  //       Thursday: '12:00 - 14:00',
  //       Friday: '12:00 - 14:00',
  //       Saturday: '12:00 - 14:00',
  //       Sunday: '12:00 - 14:00'
  //     }
  //   }
  //   // { name: 'Fabian Fonceca', startAt: '14:00', finishAt: '17:00' },
  //   // { name: 'Fatima Fernandez', startAt: '17:00', finishAt: '20:00' },
  //   // { name: 'Agustin Lara', startAt: '19:00', finishAt: '21:00' }
  // ]
  const [addOperator, setAddOperator] = useState(false)
  const handleAddOperator = () => {
    setAddOperator(true)
  }
  return (
    <div>
      <Box>
        <Typography>
          Operadores{' '}
          <IconButton
            onClick={(e) => {
              e.preventDefault()
              handleAddOperator()
            }}
          >
            <AppIcon icon="add" />
          </IconButton>
        </Typography>
      </Box>
      {collaborators?.map(({ name, id, schedule }) => (
        <Box className="flex w-full sm:w-1/2 mx-auto" key={name}>
          <Typography className="w-1/2">{name}</Typography>
          <Typography className="bg-slate-400 p-1 rounded-md m-1 text-white font-bold">
            {schedule.Friday?.split('-')[0]}
          </Typography>
          <Typography className="bg-slate-400 p-1 rounded-md m-1 text-white font-bold">
            {schedule.Friday?.split('-')[1]}
          </Typography>
        </Box>
      ))}
      {addOperator ? <OperatorForm /> : <></>}
    </div>
  )
}

export default ActivityCollaboratorsSchedule
