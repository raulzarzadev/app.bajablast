import { Box, Typography } from '@mui/material'

const ActivityCollaboratorsSchedule = () => {
  const collaborators = [
    { name: 'Fernando Faez', startAt: '12:00', finishAt: '14:00' },
    { name: 'Fabian Fonceca', startAt: '14:00', finishAt: '17:00' },
    { name: 'Fatima Fernandez', startAt: '17:00', finishAt: '20:00' },
    { name: 'Agustin Lara', startAt: '19:00', finishAt: '21:00' }
  ]
  return (
    <div>
      <Box>
        <Typography>Operadores</Typography>
      </Box>
      {collaborators.map(({ name, finishAt, startAt }) => (
        <Box className="flex w-full sm:w-1/2 mx-auto" key={name}>
          <Typography className="w-1/2">{name}</Typography>
          <Typography className="bg-slate-400 p-1 rounded-md m-1 text-white font-bold">
            {startAt}
          </Typography>
          <Typography className="bg-slate-400 p-1 rounded-md m-1 text-white font-bold">
            {finishAt}
          </Typography>
        </Box>
      ))}
    </div>
  )
}

export default ActivityCollaboratorsSchedule
