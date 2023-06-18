import { TextField, TextFieldProps } from '@mui/material'
import { Controller } from 'react-hook-form'

const ControllerText = ({
  name,
  label,
  ...rest
}: TextFieldProps & { name: string }) => {
  return (
    <Controller
      name={name}
      render={({ field }) => <TextField {...field} label={label} {...rest} />}
    />
  )
}

export default ControllerText
