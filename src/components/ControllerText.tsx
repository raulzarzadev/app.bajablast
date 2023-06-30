import { TextField, TextFieldProps } from '@mui/material'
import { useFormContext } from 'react-hook-form'

const ControllerText = ({
  name,
  label,
  ...rest
}: TextFieldProps & { name: string }) => {
  const methods = useFormContext()
  const value = methods.watch(name)
  return (
    <TextField
      {...methods.register(name)}
      value={value || ''}
      label={label}
      {...rest}
    />
  )
}

export default ControllerText
