import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  TextareaAutosize,
  Typography
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { MuiTelInput } from 'mui-tel-input'
import Modal from './Modal'
import useModal from '@/hooks/useModal'
import SignatureCanvas from 'react-signature-canvas'
const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

const ClientForm = () => {
  const methods = useForm()
  const onSubmit = (data) => console.log(data)
  const medicModal = useModal()
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

        {/** **************************************** Medic information */}
        <Button
          onClick={(e) => {
            e.preventDefault()
            medicModal.handleOpen()
          }}
        >
          Formulario medico
        </Button>
        <Modal {...medicModal} title="Formulario Medico">
          <div className="flex flex-col gap-4">
            <Typography component={'p'} variant="body2">
              * Rellena cuidadosamente esta información.{' '}
            </Typography>
            <Autocomplete
              onChange={(e) => {
                methods.setValue('blood', e)
              }}
              renderInput={(params) => (
                <TextField {...params} label="Tipo de sangre" />
              )}
              options={bloodTypes}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )
              }}
            />
            <TextField
              multiline
              minRows={4}
              maxRows={8}
              fullWidth
              label="Alergias, enfermedades, padecimientos "
            />
            <FormControlLabel
              required
              control={<Checkbox />}
              label="Esta información esta actualizada"
            />
          </div>
        </Modal>
        {/** **************************************** Terms and conditions */}
        <Button
          onClick={(e) => {
            e.preventDefault()
            medicModal.handleOpen()
          }}
        >
          Terminos y condiciones
        </Button>
        <Modal {...medicModal} title="Formulario Medico">
          <Box className="flex flex-col gap-4">
            <Typography component={'p'} variant="body2">
              Lee cuidadosamente los terminos y condiciones, si estas de acuerdo
              firma y acepta abajo
            </Typography>
            <Typography
              component={'p'}
              variant="body2"
              className="whitespace-pre-line"
            >
              {`
              1.- Al acceder al parque acepto los riesgos inneretes que conlleva
              el realizar las actividades 
              2.- Acepto hacer caso a todos los
              instructores
              etc...
              `}
            </Typography>
            <Box className="border shadow-inner p-1">
              <SignatureCanvas
                penColor="green"
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: 'sigCanvas'
                }}
              />
            </Box>
            <FormControlLabel
              required
              control={<Checkbox />}
              label="Acepto los terminos y condiciones descritos arriba"
            />
          </Box>
        </Modal>

        <Button type="submit">Guardar</Button>
      </form>
    </FormProvider>
  )
}

export default ClientForm
