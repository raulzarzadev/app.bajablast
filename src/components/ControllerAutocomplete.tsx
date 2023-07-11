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
  const value = methods.watch(name)
  const onChange = (newValue: (typeof options)[0]) => {
    methods.setValue(name, newValue)
  }
  return (
    <Autocomplete
      renderInput={(params) => <TextField {...params} label={label} />}
      options={options}
      value={value || null}
      onChange={(_, value) => {
        onChange(value)
      }}
      getOptionLabel={(option) => `${option}`}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option}>
            {option}
          </li>
        )
      }}
    />
  )
}

export default ControllerAutocomplete
