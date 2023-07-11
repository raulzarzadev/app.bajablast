import { DatePicker } from '@mui/x-date-pickers'
import { Timestamp } from 'firebase/firestore'
import { Controller } from 'react-hook-form'

const ControllerDate = ({
  name,
  label,
  format = 'dd / MM / yy'
}: {
  name: string
  label: string
  format?: string
}) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => {
        let value
        if (!!field.value) {
          value =
            field.value instanceof Timestamp
              ? field.value.toDate()
              : new Date(field.value)
        }

        return (
          <DatePicker
            format={format}
            {...field}
            value={value || null}
            label={label}
          />
        )
      }}
    />
  )
}

export default ControllerDate
