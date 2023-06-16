import { MuiTelInput } from 'mui-tel-input'
import { Controller } from 'react-hook-form'

const ControllerPhone = ({ name, label }: { name: string; label: string }) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <MuiTelInput
          {...field}
          label={label}
          preferredCountries={['MX', 'US', 'CA']}
          defaultCountry="MX"
        />
      )}
    />
  )
}

export default ControllerPhone
