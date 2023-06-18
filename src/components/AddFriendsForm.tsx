import { Box, Button, IconButton } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import ControllerText from './ControllerText'
import ModalMedicInfo from './ModalMedicInfo'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import CloseIcon from '@mui/icons-material/Close'
import { NewClientContext } from './StepperNewClient'

const AddFriendsForm = () => {
  const { setFriends, friends } = useContext(NewClientContext)
  const methods = useForm({
    defaultValues: {
      friends
    }
  })
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'friends' // unique name for your Field Array,
  })
  useEffect(() => {
    setFriends?.(fields)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods.watch('friends')])

  console.log({ friends, fields })

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
                  <ControllerText
                    name={`friends.${index}.age`}
                    label="Edad"
                    type="number"
                  />
                </Box>
                <Box component={'td'}>
                  <ModalMedicInfo name={`friends.${index}.`} />
                </Box>
              </Box>
            ))}
          </tbody>
        </table>
        <div className="text-center my-8">
          <Button
            variant="outlined"
            className=""
            onClick={() => append({ name: '', age: 0, medicalInfo: '' })}
          >
            Agregar acompañante
          </Button>
        </div>
      </FormProvider>
    </div>
  )
}

export default AddFriendsForm
