import { DatePicker } from '@mui/x-date-pickers'
import { Controller } from 'react-hook-form'

const ControllerDate = ({ name, label }: { name: string; label: string }) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <DatePicker format="dd/MMM/yy" {...field} label={label} />
      )}
    />
  )
}

export default ControllerDate
