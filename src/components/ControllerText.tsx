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
  const onChange = (newValue: string) => methods.setValue(name, newValue)
  return (
    <TextField
      value={value}
      onChange={(e) => {
        onChange(e.target.value)
      }}
      label={label}
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
