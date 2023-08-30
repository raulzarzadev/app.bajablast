import { Box, Button, IconButton, TextField } from '@mui/material'
import ControllerText from './ControllerText'
import ModalMedicInfo from './ModalMedicInfo'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import CloseIcon from '@mui/icons-material/Close'
import ControllerDate from './ControllerDate'
import { Friend } from '@/types/user'
import { CheckBox } from '@mui/icons-material'

interface NewUser {
  name: string
  birthday: null | Date
  medicalInfo: string
  id?: string
  bloodType: Friend['bloodType']
  required?: boolean
}
const AddUsersForm = ({
  users,
  handleFinish,
  handleClear
}: {
  users?: NewUser[]
  handleFinish?: (friends: NewUser[]) => void
  handleClear?: () => void
}) => {
  const defaultUsers: NewUser[] = users || [
    {
      name: '',
      birthday: null,
      medicalInfo: '',
      bloodType: 'N/A',
      required: true
    }
  ]
  const methods = useForm({
    defaultValues: {
      users: defaultUsers
    }
  })

  // console.log(methods)

  const {
    fields = [],
    append,
    remove
  } = useFieldArray({
    control: methods.control,
    name: 'users' // unique name for your Field Array,
  })

  const newFriends = methods.watch('users') || []
  const newFriendsWhitId = newFriends.map((user, i) => ({
    ...user,
    id: fields?.[i]?.id
  }))

  return (
    <div>
      <FormProvider {...methods}>
        <table>
          <tbody>
            {fields.map((field, index) => (
              <Box
                component={'tr'}
                className="flex items-center gap-1 mt-4"
                key={field.id}
              >
                <Box component={'td'}>
                  <IconButton
                    onClick={() => remove(index)}
                    disabled={field?.required}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Box component={'td'}>
                  <ControllerText name={`users.${index}.name`} label="Nombre" />
                </Box>
                <Box component={'td'}>
                  <ControllerDate
                    name={`users.${index}.birthday`}
                    label="Edad"
                    //type="number"
                  />
                </Box>
                <Box component={'td'}>
                  {/** The name have last dot to access the nested object  */}
                  <ModalMedicInfo name={`users.${index}.`} justIcon />
                </Box>
              </Box>
            ))}
          </tbody>
        </table>
      </FormProvider>

      <div className="text-center my-8">
        <Button
          variant="outlined"
          className=""
          onClick={() =>
            append({
              name: '',
              birthday: null,
              medicalInfo: '',
              bloodType: 'N/A'
            })
          }
        >
          Agregar acompañante
        </Button>
      </div>
      <div className="flex w-full justify-between">
        <Button
          onClick={() => {
            handleClear?.()
          }}
        >
          Borrar
        </Button>
        <Button
          onClick={() => {
            handleFinish?.(newFriendsWhitId)
          }}
        >
          Listo
        </Button>
      </div>
      {/* {handleFinish && (
        <div className="text-center my-8">
          <Button variant="outlined" className="" onClick={handleFinish}>
            Siguiente
          </Button>
        </div>
      )} */}
    </div>
  )
}

export default AddUsersForm
