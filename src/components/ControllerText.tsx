import { TextField, TextFieldProps } from '@mui/material'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

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
  // return (
  //   <Controller
  //     name={name}
  //     render={({ field }) => <TextField {...field} label={label} {...rest} />}
  //   />
  // )
}

export default ControllerText
