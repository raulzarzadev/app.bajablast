'use client'
import { ParkActivity } from '@/types/activities'
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import ControllerText from './ControllerText'
import { ACTIVITY_STATUS } from '@/CONST/activityStatus'

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
  const formValues = methods.watch()
  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(_onSubmit)}>
          <Box className="grid gap-4 ">
            <ControllerText name="name" label="Nombre" />
            <ControllerText name="description" label="Descripción" />
            <ControllerText name="shortName" label="Nombre corto" />
            <ControllerText type="number" name="price" label="Precio" />
            <FormControl>
              <FormLabel id="radio-select-activity-status">Estado</FormLabel>
              <RadioGroup
                row
                aria-labelledby="radio-select-activity-status"
                value={formValues.status || ''}
                onChange={(e) =>
                  methods.setValue(
                    'status',
                    e.target.value as unknown as ParkActivity['status']
                  )
                }
              >
                {Object.entries(ACTIVITY_STATUS).map(([key, value]) => (
                  <FormControlLabel
                    key={key}
                    value={key}
                    control={<Radio />}
                    label={value.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
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
