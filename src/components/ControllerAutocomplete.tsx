import { Autocomplete, TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

const ControllerAutocomplete = ({
  name,
  label,
  options
}: {
  name: string
  label: string
  options: string[]
}) => {
  const methods = useFormContext()
  return (
    <Controller
      name={name}
      render={({ field }) => {
        return (
          <Autocomplete
            renderInput={(params) => <TextField {...params} label={label} />}
            options={options}
            {...field}
            value={methods.watch(name)}
            onChange={(_, value) => {
              field.onChange(value)
            }}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option}>
                  {option}
                </li>
              )
            }}
          />
        )
      }}
    />
  )
}

export default ControllerAutocomplete
