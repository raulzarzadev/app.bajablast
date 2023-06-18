import { Checkbox, FormControlLabel } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

const ControllerCheckbox = ({ name = '', label = '', disabled = false }) => {
  const methods = useFormContext()
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Checkbox
              {...field}
              disabled={disabled}
              checked={methods.watch(name)}
            />
          }
          label={label}
        />
      )}
    />
  )
}

export default ControllerCheckbox
