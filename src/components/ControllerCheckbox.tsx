import { Checkbox, FormControlLabel } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

const ControllerCheckbox = ({ name = '', label = '', disabled = false }) => {
  const methods = useFormContext()
  const onChange = (value: boolean) => {
    methods.setValue(name, value)
  }
  const checked = methods.watch(name) || false
  return (
    <FormControlLabel
      control={
        <Checkbox
          {...methods.register(name)}
          disabled={disabled}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
      }
      label={label}
    />
  )
}

export default ControllerCheckbox
