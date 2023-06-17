import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography
} from '@mui/material'
import { useForm, FormProvider } from 'react-hook-form'
import Modal from './Modal'
import useModal from '@/hooks/useModal'
import SignatureCanvas from 'react-signature-canvas'
import { useRef } from 'react'
import ControllerDate from './ControllerDate'
import ControllerPhone from './ControllerPhone'
import ControllerText from './ControllerText'
import ControllerAutocomplete from './ControllerAutocomplete'
import bloodTypes from '@/CONST/blodTypes'
import Link from 'next/link'

const ClientForm = ({ client }: { client: unknown }) => {
  console.log(client)
  const methods = useForm({
    defaultValues: client || {
      birthday: new Date(),
      medicalInfoUpdated: false,
      acceptTerms: false,
      signature: [],
      medicalInfo: ''
    }
  })
  const formValues = methods.watch()

  const onSubmit = (data: unknown) => console.log(data)

  const medicModal = useModal()
  const termsAndCondsModal = useModal()

  const signatureRef = useRef<any>(null)
  const handleClearSignature = () => {
    signatureRef?.current?.clear?.()
  }
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mx-auto max-w-md"
      >
        <ControllerText name="name" label="Nombre" />
        <ControllerText name="email" label="Correo" />
        <ControllerPhone name="phone" label="telefono" />
        <ControllerDate name={'birthday'} label="Fecha de nacimiento" />

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
            <ControllerAutocomplete
              options={bloodTypes}
              name="bloodType"
              label="Tipo de sangre"
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
        <Button
          LinkComponent={Link}
          href={`?formValues=${JSON.stringify(formValues)}`}
        >
          Siguiente
        </Button>
      </form>
    </FormProvider>
  )
}

export default ClientForm
