import { TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

const ControllerText = ({ name, label }: { name: string; label: string }) => {
  return (
    <Controller
      name={name}
      render={({ field }) => <TextField {...field} label={label} />}
    />
  )
}

export default ControllerText
