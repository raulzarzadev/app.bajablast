import { Button, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { MuiTelInput } from 'mui-tel-input'

const ClientForm = () => {
  const methods = useForm()
  const onSubmit = (data) => console.log(data)

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mx-auto max-w-md"
      >
        <TextField {...methods.register('name')} label="Nombre"></TextField>
        <TextField {...methods.register('email')} label="Correo"></TextField>
        <MuiTelInput
          value={methods.watch('mobil')}
          onChange={(value) => {
            methods.setValue('mobil', value)
            console.log(value)
          }}
          label="Teléfono"
          preferredCountries={['MX', 'US', 'CA']}
          defaultCountry="MX"
        />
        <DatePicker
          format="DD/MM/YYYY"
          label="Fecha de nac"
          onChange={(props) => {
            console.log(props)

            //methods.setValue('birthday', )
          }}
        />
        <Button type="submit">Guardar</Button>
      </form>
    </FormProvider>
  )
}

export default ClientForm
