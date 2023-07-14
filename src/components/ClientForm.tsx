import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material'
import { useForm, FormProvider } from 'react-hook-form'
import Modal from './Modal'
import useModal from '@/hooks/useModal'
import SignatureCanvas from 'react-signature-canvas'
import { useContext, useId, useRef, useState } from 'react'
import ControllerDate from './ControllerDate'
import ControllerPhone from './ControllerPhone'
import ControllerText from './ControllerText'
import ControllerCheckbox from './ControllerCheckbox'
import Image from 'next/image'
import ModalMedicInfo from './ModalMedicInfo'
import { NewClient, UserType } from '@/types/user'
import { USER_ROLES } from '@/CONST/user'
import ModalAcceptTerms from './ModalAcceptTerms'

const ClientForm = ({
  client,
  handleSubmit,
  editRol
}: {
  client?: NewClient
  handleSubmit?: (data: NewClient) => void
  editRol?: boolean
}) => {
  const defaultClient: NewClient = {
    bloodType: 'N/A',
    birthday: null,
    signature: '',
    medicalInfo: '',
    name: '',
    phone: '',
    email: '',
    medicalInfoUpdated: false,
    termsAccepted: false,
    rol: 'CLIENT',
    emergencyPhone: '',
    image: ''
  }
  const methods = useForm({
    defaultValues: { ...defaultClient, ...client } || defaultClient
  })
  const formValues = methods.watch()
  const termsAndCondsModal = useModal()
  const signatureRef = useRef<any>()
  const handleClearSignature = () => {
    signatureRef?.current?.clear?.()
  }
  //const [imageSignature, setImageSignature] = useState<string | null>(null)

  const onSubmit = (data: NewClient) => {
    const clientData = {
      ...data
      //signature: imageSignature
    }
    handleSubmit?.(clientData)
  }
  console.log({ clientsignature: client?.signature })
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mx-auto max-w-md"
      >
        {editRol && (
          <FormControl className="mx-auto">
            <FormLabel id="demo-row-radio-buttons-group-label">
              Seleccionar tipo de usuario
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              value={formValues.rol}
              onChange={(e) =>
                methods.setValue(
                  'rol',
                  e.target.value as unknown as UserType['rol']
                )
              }
            >
              {Object.entries(USER_ROLES).map(([key, { label }]) => (
                <FormControlLabel
                  key={key}
                  value={key}
                  control={<Radio />}
                  label={label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}
        <ControllerText name="name" label="Nombre" />
        <ControllerText name="email" label="Correo" />
        <ControllerPhone name="phone" label="telefono" />
        <ControllerDate name={'birthday'} label="Fecha de nacimiento" />

        {/** **************************************** Medic information */}
        <ModalMedicInfo />

        <div className="flex justify-evenly w-full">
          <Button
            onClick={(e) => {
              e.preventDefault()
              methods.reset(defaultClient)
            }}
          >
            Limpiar
          </Button>
          <Button
            disabled={
              !formValues.termsAccepted && formValues.medicalInfoUpdated
            }
            // LinkComponent={Link}
            type="submit"
          >
            Guardar
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default ClientForm
