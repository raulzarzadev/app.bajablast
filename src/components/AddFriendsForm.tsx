import { Box, Button, IconButton, TextField } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import ControllerText from './ControllerText'
import ModalMedicInfo from './ModalMedicInfo'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import CloseIcon from '@mui/icons-material/Close'
import ControllerDate from './ControllerDate'
import { Friend } from '@/types/user'

const AddFriendsForm = ({
  friends,
  handleFinish,
  handleClear
}: {
  friends?: Friend[]
  handleFinish?: (friends: Friend[]) => void
  handleClear?: () => void
}) => {
  const methods = useForm({
    defaultValues: {
      friends
    }
  })
  // console.log(methods)

  const {
    fields = [],
    append,
    remove
  } = useFieldArray({
    control: methods.control,
    name: 'friends' // unique name for your Field Array,
  })

  const newFriends = methods.watch('friends')

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
                  <IconButton onClick={() => remove(index)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Box component={'td'}>
                  <ControllerText
                    name={`friends.${index}.name`}
                    label="Nombre"
                  />
                </Box>
                <Box component={'td'}>
                  <ControllerDate
                    name={`friends.${index}.birthday`}
                    label="Edad"
                    //type="number"
                  />
                </Box>
                <Box component={'td'}>
                  {/** The name have last dot to access the nested object  */}
                  <ModalMedicInfo name={`friends.${index}.`} />
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
              birthday: new Date(),
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
            handleFinish?.(newFriends || [])
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

export default AddFriendsForm
