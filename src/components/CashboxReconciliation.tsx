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
import useCollaborators from '@/hooks/useCollaborators'
import { useState } from 'react'
import { Client } from '@/types/user'
type ReconciliationData = {
  cashier: { name: string; id: string } | null
  from: Date
  to: Date
}
const CashboxReconciliation = () => {
  const { clients } = useClients()
  const modal = useModal()

  const handleSubmitReconciliation = (data: ReconciliationData) => {
    setReconciliationData(data)
    const filteredClientsByDate =
      clients?.filter((client) => {
        const paymentCreatedAt = asDate(client?.payment?.created?.at)
        if (paymentCreatedAt === null) return false
        const from = asDate(data.from) || new Date()
        const to = asDate(data.to) || new Date()
        return isAfter(paymentCreatedAt, from) && isBefore(paymentCreatedAt, to)
      }) || []

    let payments: Client[] = filteredClientsByDate

    const cashierId = data?.cashier?.id
    if (cashierId) {
      payments = filteredClientsByDate.filter(
        (client) => client?.payment?.created.by === cashierId
      )
    }
    setClientsFiltered(payments)
  }
  const [clientsFiltered, setClientsFiltered] = useState<Client[]>([])
  const [reconciliationData, setReconciliationData] =
    useState<ReconciliationData>()
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
        <ReconciliationInfo
          clients={clientsFiltered}
          reconciliationData={reconciliationData}
        />
      </Modal>
    </Box>
  )
}

const ReconciliationInfo = ({
  reconciliationData,
  clients
}: {
  clients: Client[]
  reconciliationData?: ReconciliationData
}) => {
  const cashier = reconciliationData?.cashier || null
  const activities = clients
    .map((client) => {
      const friendsActivities =
        client?.friends?.map((friend) => {
          return friend?.activity
        }) || []
      return [client.activity, ...friendsActivities]
    })
    .flat()

  const groupedActivities: Record<string, any[]> = {}
  activities.forEach((activity) => {
    const name = activity?.name || ''
    if (!groupedActivities[name]) {
      groupedActivities[name] = []
    }
    groupedActivities[name].push(activity)
  })

  const totalCash = clients.reduce((acc, client) => {
    return (
      //TODO: should add discount?
      acc + (client?.payment?.method === 'cash' ? client.payment?.amount : 0)
    )
  }, 0)
  const totalDollars = clients.reduce((acc, client) => {
    return (
      //TODO: should add discount?
      acc + (client?.payment?.method === 'usd' ? client.payment?.amount : 0)
    )
  }, 0)
  const totalCard = clients.reduce((acc, client) => {
    return (
      //TODO: should add discount?
      acc + (client?.payment?.method === 'card' ? client.payment?.amount : 0)
    )
  }, 0)
  const total = totalCash + totalDollars + totalCard

  return (
    <Box>
      <Box className="flex justify-end">
        <Typography className="mx-2">
          Desde:{' '}
          {dateFormat(asDate(reconciliationData?.from), ' dd/MMM/yy HH:mm ')}
        </Typography>
        <Typography className="mx-2">
          Hasta:{' '}
          {dateFormat(asDate(reconciliationData?.to), ' dd/MMM/yy HH:mm ')}
        </Typography>
      </Box>
      <Typography className="text-center">
        Cajero: {cashier ? cashier.name : 'Todos'}
      </Typography>
      <Box className="w-1/2 text-end">
        {Object.entries(groupedActivities).map(([name, activities]) => (
          <Box key={name}>
            <Typography>
              {name}: {activities?.length || 0}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box className="text-end">
        <Typography>Pagos: {clients.length || 0}</Typography>
        <Typography>
          Efectivo: <CurrencySpan quantity={totalCash} />
        </Typography>
        <Typography>
          Dollares: <CurrencySpan quantity={totalDollars} />
        </Typography>
        <Typography>
          Tarjeta: <CurrencySpan quantity={totalCard} />
        </Typography>
        <Typography className="text-center" variant="h4">
          Total: <CurrencySpan quantity={total} />
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
  const { collaborators } = useCollaborators()

  // const cashiers: readonly Cashier[] = [
  //   { name: 'Todos', id: 'all' },
  //   { name: 'Raul Zarza', id: '1' },
  //   { name: 'Gamaliel Gonzalez', id: '2' },
  //   { name: 'Enrique Escobar', id: '3' }
  // ]
  // console.log({ formValues })
  const cashiers: readonly Cashier[] =
    collaborators?.map(({ name = '', id = '' }) => ({
      name,
      id
    })) || []

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
