import { Autocomplete, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

const ControllerAutocomplete = ({
  name,
  label,
  options
}: {
  name: string
  label: string
  options: string[]
}) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Autocomplete
          {...field}
          renderInput={(params) => <TextField {...params} label={label} />}
          options={options}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option}>
                {option}
              </li>
            )
          }}
        />
      )}
    />
  )
}

export default ControllerAutocomplete
