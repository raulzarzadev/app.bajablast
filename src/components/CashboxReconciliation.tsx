'use client'

import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material'
import useModal from '@/hooks/useModal'
import Modal from './Modal'
import { FormProvider, useForm } from 'react-hook-form'
import LoadingButton from './LoadingButton'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import useClients from '@/hooks/useClients'
import { isAfter, isBefore } from 'date-fns'
import asDate from '@/utils/asDate'
import { dateFormat } from '@/utils/utils-date'
import CurrencySpan from './CurrencySpan'

const CashboxReconciliation = () => {
  const { clients } = useClients()
  const modal = useModal()
  const handleSubmitReconciliation = (data: {
    cashier: { name: string; id: string }
    from: Date
    to: Date
  }) => {
    //** Filter clients that had paymentes between dates */
    const filteredClients = clients?.filter((client) => {
      const paymentCreatedAt = asDate(client?.payment?.created?.at)
      if (paymentCreatedAt === null) return false
      return (
        isAfter(paymentCreatedAt, asDate(data.from) || new Date()) &&
        isBefore(paymentCreatedAt, asDate(data.to) || new Date())
      )
    })
    console.log({ filteredClients })
  }

  return (
    <Box className="max-w-md mx-auto">
      <Typography variant="h4">Cortes de caja</Typography>
      <Button
        onClick={(e) => {
          e.preventDefault()
          modal.handleOpen()
        }}
      >
        Nuevo corte
      </Button>
      <Typography>Lista de cortes previos</Typography>
      <Modal {...modal} title="Nuevo corte">
        <ReconciliationForm onSubmit={handleSubmitReconciliation} />
        <ReconciliationInfo />
      </Modal>
    </Box>
  )
}

const ReconciliationInfo = () => {
  return (
    <Box>
      <Box className="flex justify-end">
        <Typography className="mx-2">
          Desde: {dateFormat(asDate(new Date()), ' dd/MMM/yy HH:mm ')}
        </Typography>
        <Typography className="mx-2">
          Hasta: {dateFormat(asDate(new Date()), ' dd/MMM/yy HH:mm ')}
        </Typography>
      </Box>
      <Box>
        <Box>actividad-2: 2</Box>
        <Box>actividad-1: 5</Box>
        <Box>actividad-6: 1</Box>
      </Box>
      <Box className="text-end">
        <Typography>Pagos: 6</Typography>
        <Typography>
          Efectivo: <CurrencySpan quantity={2500} />
        </Typography>
        <Typography>
          Dollares: <CurrencySpan quantity={200} />
        </Typography>
        <Typography>
          Tarjeta: <CurrencySpan quantity={1800} />
        </Typography>
        <Typography className="text-center" variant="h4">
          Total: <CurrencySpan quantity={4500} />
        </Typography>
      </Box>
    </Box>
  )
}

const ReconciliationForm = ({
  onSubmit
}: {
  onSubmit: (data: any) => void
}) => {
  const methods = useForm({
    defaultValues: {
      from: new Date(),
      to: new Date(),
      cashier: null
    }
  })
  const formValues = methods.watch()
  const _onSubmit = (data: any) => {
    onSubmit(data)
  }
  interface Cashier {
    name: string
    id: string
  }
  const cashiers: readonly Cashier[] = [
    { name: 'Todos', id: 'all' },
    { name: 'Raul Zarza', id: '1' },
    { name: 'Gamaliel Gonzalez', id: '2' },
    { name: 'Enrique Escobar', id: '3' }
  ]
  // console.log({ formValues })
  return (
    <form>
      <FormProvider {...methods}>
        <Typography className="mt-4 mb-2">Cajero:</Typography>

        <Autocomplete
          options={cashiers}
          renderInput={(params) => (
            <TextField
              {...params}
              label={'Seleccionar cajero'}
              placeholder="Seleccionar cajero"
            />
          )}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          value={formValues.cashier || null}
          onChange={(_, value: any) => {
            methods.setValue('cashier', value)
          }}
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option?.id}>
                {option?.name}
              </li>
            )
          }}
        />
        <Typography className="mt-4 mb-2">Periodo:</Typography>
        <Box className="flex w-full justify-between mb-4">
          <DateTimePicker
            ampm={false}
            className="w-full mr-2"
            label="Desde"
            format="dd/MMM/yy HH:mm"
            value={formValues.from}
            onChange={(value: any) => methods.setValue('from', value)}
          />
          <DateTimePicker
            ampm={false}
            className="w-full ml-2"
            label="Hasta"
            format="dd/MMM/yy HH:mm"
            value={formValues.to}
            onChange={(value: any) => methods.setValue('to', value)}
          />
        </Box>
        <LoadingButton
          label="Generar"
          onClick={methods.handleSubmit(_onSubmit)}
          icon="add"
        ></LoadingButton>
      </FormProvider>
    </form>
  )
}

export default CashboxReconciliation
