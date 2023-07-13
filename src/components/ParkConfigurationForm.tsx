'use client'
import LoadingButton from './LoadingButton'
import { useForm } from 'react-hook-form'
import { TextField, Typography } from '@mui/material'
import ScheduleForm from './ScheduleForm'
import {
  createParkConfiguration,
  updateParkConfiguration
} from '@/firebase/parkConfigurations'
import { ParkConfiguration } from '@/types/parkConfiguration'

const ParkConfigurationForm = ({ config }: { config?: ParkConfiguration }) => {
  const handleSubmitConfiguration = async (data: ParkConfiguration) => {
    try {
      if (config?.id) {
        const res = await updateParkConfiguration(config.id, data)
        return
      }
      const res = await createParkConfiguration(data)
      return
    } catch (error) {
      console.log({ error })
    }
  }
  const methods = useForm({ defaultValues: config })

  return (
    <div>
      <Typography variant="h5" className="text-center mt-8">
        Configuración del parque
      </Typography>
      <form className="grid max-w-md mx-auto gap-4 my-4 ">
        {/* <WeekScheduleSection
          setSchedule={(schedule) => methods.setValue('schedule', schedule)}
        /> */}
        <TextField {...methods.register('name')} label="Nombre"></TextField>
        <TextField
          {...methods.register('dollarPrice')}
          label="Precio del dolar"
          type="number"
        ></TextField>
        <ScheduleForm
          schedule={methods.watch('schedule')}
          onChange={(schedule) => methods.setValue('schedule', schedule)}
        />

        <LoadingButton
          label="Guardar"
          onClick={methods.handleSubmit(handleSubmitConfiguration)}
        />
      </form>
    </div>
  )
}

export default ParkConfigurationForm
