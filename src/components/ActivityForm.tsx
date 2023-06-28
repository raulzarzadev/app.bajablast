'use client'
import { ParkActivity } from '@/types/activities'
import { Box, Button } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import ControllerText from './ControllerText'
import { createActivity } from '@/firebase/activities'

const ActivityForm = ({
  onSubmit,
  activity,
  onCancel
}: {
  activity?: ParkActivity
  onSubmit?: (activity: ParkActivity) => void | Promise<any>
  onCancel?: () => void
}) => {
  const methods = useForm({ defaultValues: activity })
  const _onSubmit = (data: any) => {
    onSubmit?.(data)
  }
  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(_onSubmit)}>
          <Box className="grid gap-4 ">
            <ControllerText name="name" label="Nombre" />
            <ControllerText name="description" label="Descripción" />
            <ControllerText name="shortName" label="Nombre corto" />
            <ControllerText type="number" name="price" label="Precio" />
            <Box className="flex w-full justify-around ">
              {onCancel && (
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    onCancel()
                  }}
                  variant="outlined"
                  color="error"
                >
                  Cancelar
                </Button>
              )}
              <Button type="submit">Guardar</Button>
            </Box>
          </Box>
        </form>
      </FormProvider>
    </div>
  )
}

export default ActivityForm
