import { Box, Button, Typography } from '@mui/material'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import Modal from './Modal'
import useModal from '@/hooks/useModal'
import SignatureCanvas from 'react-signature-canvas'
import { useContext, useRef, useState } from 'react'
import ControllerDate from './ControllerDate'
import ControllerPhone from './ControllerPhone'
import ControllerText from './ControllerText'
import ControllerCheckbox from './ControllerCheckbox'
import Image from 'next/image'
import ModalMedicInfo from './ModalMedicInfo'
import { NewClient, NewClientContext } from '@/context/new-client'
import bloodTypes from '@/CONST/bloodTypes'

const ClientForm = () => {
  const { client } = useContext(NewClientContext)
  console.log({ client })
  const defaultClient: NewClient = {
    bloodType: 'N/A',
    birthday: new Date(),
    signature: '',
    medicalInfo: '',
    name: '',
    phone: '',
    email: '',
    medicalInfoUpdated: false,
    termsAccepted: false,
    rol: 'CLIENT',
    emergencyPhone: ''
  }
  const methods = useForm({
    defaultValues: client || defaultClient
  })
  const formValues = methods.watch()
  const termsAndCondsModal = useModal()
  const signatureRef = useRef<any>()
  const handleClearSignature = () => {
    signatureRef?.current?.clear?.()
  }

  const [imageSignature, setImageSignature] = useState<string | null>(null)
  const clientContext = useContext(NewClientContext)
  const onSubmit = (data: object) => {
    const clientData = { ...data, signature: imageSignature }
    clientContext?.setClient?.(clientData)
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
        <ModalMedicInfo />
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
            Aceptar terminos
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
                  setImageSignature(null)
                  methods.setValue('acceptTerms', false)
                }}
                color="success"
              >
                Limpiar
              </Button>
            </Box>
            <Box className="border shadow-inner p-1">
              <SignatureCanvas
                onEnd={(e) => {
                  const image = signatureRef.current
                    .getTrimmedCanvas()
                    .toDataURL('image/png')
                  setImageSignature(image)
                  methods.setValue('acceptTerms', true)
                }}
                penColor="green"
                ref={(ref) => (signatureRef.current = ref)}
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: 'sigCanvas'
                }}
              />
            </Box>
            {imageSignature && (
              <Image
                src={imageSignature}
                width={80}
                height={80}
                alt="signature"
                className="w-[80px] h-[80px]"
              />
            )}

            <ControllerCheckbox
              disabled={!imageSignature}
              name={'acceptTerms'}
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
          disabled={!formValues.acceptTerms && formValues.medicalInfoUpdated}
          // LinkComponent={Link}
          type="submit"
        >
          Guardar
        </Button>
      </form>
    </FormProvider>
  )
}

export default ClientForm
