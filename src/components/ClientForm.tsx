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
import {
  useForm,
  FormProvider,
  useFormContext,
  Controller
} from 'react-hook-form'
import { MuiTelInput } from 'mui-tel-input'
import Modal from './Modal'
import useModal from '@/hooks/useModal'
import SignatureCanvas from 'react-signature-canvas'
import { useRef } from 'react'
import ModalSave from './ModalSave'
const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

const ClientForm = () => {
  const methods = useForm()
  const signatureRef = useRef<any>(null)
  const onSubmit = (data: unknown) => console.log(data)
  const medicModal = useModal()
  const termsAndCondsModal = useModal()
  const formValues = methods.watch()
  const handleClearSignature = () => {
    signatureRef?.current?.clear?.()
  }
  // console.log(formValues)
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

        {!formValues.medicalInfoUpdated ? (
          <Button
            onClick={(e) => {
              e.preventDefault()
              medicModal.handleOpen()
            }}
            variant="outlined"
            color="error"
          >
            Actualiza Formulario medico
          </Button>
        ) : (
          <Button
            onClick={(e) => {
              e.preventDefault()
              medicModal.handleOpen()
            }}
            variant="outlined"
            color="success"
          >
            Formulario medico actualizado
          </Button>
        )}

        <Modal {...medicModal} title="Formulario Medico">
          <div className="flex flex-col gap-4">
            <Typography component={'p'} variant="body2">
              * Rellena cuidadosamente esta información.{' '}
            </Typography>
            <Autocomplete
              onChange={(value) => {
                methods.setValue('bloodType', value)
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
              {...methods.register('medicalInfo')}
            />
            <FormControlLabel
              {...methods.register('medicalInfoUpdated')}
              required
              control={<Checkbox />}
              label="Esta información esta actualizada"
            />
            <Button
              variant="outlined"
              onClick={(e) => {
                e.preventDefault()
                medicModal.onClose()
              }}
            >
              Cerrar
            </Button>
          </div>
        </Modal>
        {/** **************************************** Terms and conditions */}
        {formValues.acceptTerms ? (
          <Button
            variant="outlined"
            color="success"
            onClick={(e) => {
              e.preventDefault()
              termsAndCondsModal.handleOpen()
            }}
          >
            Terminos aceptados
          </Button>
        ) : (
          <Button
            onClick={(e) => {
              e.preventDefault()
              termsAndCondsModal.handleOpen()
            }}
            variant="outlined"
            color="error"
          >
            Terminos y condiciones aceptados
          </Button>
        )}
        <Modal {...termsAndCondsModal} title="Terminos y condiciones">
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
            <Box className="flex w-full justify-between -mb-4">
              <Typography className="">Firma:</Typography>
              <Button
                size="small"
                onClick={(e) => {
                  e.preventDefault()
                  handleClearSignature()
                }}
                color="success"
              >
                Limpiar
              </Button>
            </Box>
            <Box className="border shadow-inner p-1">
              <SignatureCanvas
                penColor="green"
                onEnd={(e) => {
                  const value = signatureRef?.current?.toData?.()
                  methods.setValue('signature', value)
                }}
                ref={signatureRef}
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: 'sigCanvas'
                }}
              />
            </Box>

            <FormControlLabel
              {...methods.register('acceptTerms')}
              control={<Checkbox />}
              required
              label="Acepto los terminos y condiciones descritos arriba"
            />

            <Button
              variant="outlined"
              onClick={(e) => {
                e.preventDefault()
                termsAndCondsModal.onClose()
              }}
            >
              Cerrar
            </Button>
          </Box>
        </Modal>

        <ModalSave
          handleConfirm={() => {
            console.log('save')
          }}
          
        >
          {Object.keys(formValues).map((key) => (
            <p key={key}>
              {key}: {typeof formValues[key] === 'string' && formValues[key]}
            </p>
          ))}
        </ModalSave>
      </form>
    </FormProvider>
  )
}

export default ClientForm
