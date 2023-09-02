import {
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack
} from '@mui/material'
import { useForm, FormProvider } from 'react-hook-form'

import ControllerDate from './ControllerDate'
import ControllerPhone from './ControllerPhone'
import ControllerText from './ControllerText'
import ModalMedicInfo from './ModalMedicInfo'
import { Client, NewClient, UserType } from '@/types/user'
import { USER_ROLES } from '@/CONST/user'
import { useState } from 'react'

const ClientForm = ({
  client,
  handleSubmit,
  editRol
}: {
  client?: NewClient
  handleSubmit?: (data: NewClient | Client) => void | Promise<any>
  editRol?: boolean
}) => {
  const [loading, setLoading] = useState(false)
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

  //const [imageSignature, setImageSignature] = useState<string | null>(null)

  const onSubmit = async (data: NewClient) => {
    try {
      setLoading(true)
      const clientData = {
        ...data
        //signature: imageSignature
      }
      await handleSubmit?.(clientData)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }
  const handleAddEmailDomain = (domain: string) => {
    methods.setValue('email', `${formValues.email}${domain}`)
  }
  const emailsDomains = [
    '@gmail.com',
    '@hotmail.com',
    '@outlook.com',
    '@live.com'
  ]

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
        <Stack
          className="-mt-2"
          direction="row"
          spacing={1}
          flexWrap={'wrap'}
          useFlexGap={true}
        >
          {formValues.email.length > 1 &&
            emailsDomains.map((domain) => (
              <Chip
                key={domain}
                disabled={formValues.email.includes('@')}
                label={domain}
                onClick={() => {
                  handleAddEmailDomain(domain)
                }}
              />
            ))}
        </Stack>
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
            disabled={!formValues.medicalInfoUpdated || loading}
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
