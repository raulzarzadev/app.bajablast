'use client'
import { ParkActivity } from '@/types/activities'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import ControllerText from './ControllerText'
import { ACTIVITY_STATUS } from '@/CONST/activityStatus'
import ScheduleForm from './ScheduleForm'
import { useEffect, useRef, useState } from 'react'
import ModalConfirm from './ModalConfirm'
import useModal from '@/hooks/useModal'
import { deleteActivity } from '@/firebase/activities'

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
  const scheduleAsPark = !!formValues.scheduleAsPark
  const requiresInsurance = !!formValues?.requiresInsurance

  const recommendationsRef = useRef(null)

  const [recommendationsRows, setRecommendationsRows] = useState(3)
  useEffect(() => {
    const linesJumps = formValues.recommendations?.split('\n').length || 3
    setRecommendationsRows(linesJumps)
  }, [formValues.recommendations])
  const handleDeleteActivity = async (actividadId: string) => {
    return await deleteActivity(actividadId)
  }
  const modalDelete = useModal()

  return (
    <div className="my-4">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(_onSubmit)}>
          <Box className="grid gap-4 ">
            {/* ********* Basic information of the activity */}

            <ControllerText name="name" label="Nombre" />
            <ControllerText name="description" label="Descripción" />
            {/* <ControllerText name="shortName" label="Nombre corto" /> */}
            <ControllerText type="number" name="price" label="Precio" />

            {/* ********* Current state of the activity  */}

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

            {/* <FormControlLabel
              checked={requiresInsurance}
              {...methods.register('requiresInsurance')}
              label="Requiere seguro?"
              control={<Checkbox />}
            /> */}
            {/* ********* Activity schedule */}
            <FormControlLabel
              checked={scheduleAsPark}
              {...methods.register('scheduleAsPark')}
              label="Igual al del parque?"
              control={<Checkbox />}
            />
            <ScheduleForm
              schedule={formValues.schedule}
              onChange={(schedule) => {
                methods.setValue('schedule', schedule)
              }}
            />

            <TextField
              multiline
              rows={recommendationsRows}
              placeholder="Recomendaciones"
              {...methods.register('recommendations')}
              inputRef={recommendationsRef}
            />

            <Box className="flex w-full justify-around ">
              <Button
                variant="outlined"
                type="submit"
                color="error"
                onClick={(e) => {
                  e.preventDefault()
                  modalDelete.handleOpen()
                }}
              >
                Eliminar
              </Button>
              <ModalConfirm
                {...modalDelete}
                buttonConfirmProps={{
                  onClick() {
                    return handleDeleteActivity(activity?.id || '')
                  },
                  color: 'error',
                  label: 'Eliminar'
                }}
              >
                <Typography>
                  Se eliminara esta actividad, pero seguira formando parte de
                  las estadisiticas de cada usuario. ¿Desea continuar?
                </Typography>
              </ModalConfirm>
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

              <Button variant="outlined" type="submit">
                Guardar
              </Button>
            </Box>
          </Box>
        </form>
      </FormProvider>
    </div>
  )
}

export default ActivityForm
