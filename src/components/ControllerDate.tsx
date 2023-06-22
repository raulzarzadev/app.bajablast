import { DatePicker } from '@mui/x-date-pickers'
import { Timestamp } from 'firebase/firestore'
import { Controller } from 'react-hook-form'

const ControllerDate = ({ name, label }: { name: string; label: string }) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => {
        const value =
          field.value instanceof Timestamp
            ? field.value.toDate()
            : new Date(field.value)
        return (
          <DatePicker
            format="dd / MM / yy"
            {...field}
            value={value}
            label={label}
          />
        )
      }}
    />
  )
}

export default ControllerDate
