'use client'

import {
  Autocomplete,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material'
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
import { createContext, useContext, useEffect, useState } from 'react'
import { Client } from '@/types/user'
import calculateReconciliation from '@/utils/calculateReconciliation'
import { ReconciliationData } from '@/types/reconciliations'
import { createReconciliation } from '@/firebase/reconciliations'
import CashboxReconciliationsList from './CashboxReconciliationsList'
import CashboxReconciliationCard from './CashboxReconciliationCard'

type CashBoxContext = {
  isDirty?: boolean
  setIsDirty?: (value: boolean) => void
}
const CashBoxContext = createContext<CashBoxContext>({})

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

  const [isDirty, setIsDirty] = useState(false)
  return (
    <CashBoxContext.Provider value={{ isDirty, setIsDirty }}>
      <Box className=" mx-auto text-center">
        <Typography variant="h4">Cortes de caja</Typography>

        <Button
          onClick={(e) => {
            e.preventDefault()
            modal.handleOpen()
          }}
          variant="outlined"
          className="my-4"
        >
          Nuevo corte
        </Button>
        <CashboxReconciliationsList />
        <Modal {...modal} title="Nuevo corte">
          <ReconciliationForm onSubmit={handleSubmitReconciliation} />
          {reconciliationData && (
            <ReconciliationInfo
              clients={clientsFiltered}
              reconciliationData={reconciliationData}
            />
          )}
        </Modal>
      </Box>
    </CashBoxContext.Provider>
  )
}

const ReconciliationInfo = ({
  reconciliationData,
  clients
}: {
  clients: Client[]
  reconciliationData?: ReconciliationData
}) => {
  const reconciliation = calculateReconciliation(clients, reconciliationData)

  const handleSave = async () => {
    try {
      const res = await createReconciliation(reconciliation)
      return
    } catch (error) {
      console.error(error)
    }
  }
  const cashBoxContext = useContext(CashBoxContext)
  console.log({ first: cashBoxContext.isDirty })
  return (
    <Box>
      <CashboxReconciliationCard reconciliation={reconciliation} />
      <Box className="flex w-full justify-evenly my-4">
        <LoadingButton
          disabled={cashBoxContext.isDirty}
          label="Guardar"
          icon="save"
          onClick={async () => {
            return await handleSave()
          }}
        ></LoadingButton>
        {/* <LoadingButton
          label="Imprimir"
          icon="print"
          onClick={() => {
            handlePrint()
          }}
        ></LoadingButton> */}
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
  const cashBoxContext = useContext(CashBoxContext)
  const _onSubmit = (data: any) => {
    // console.log(data)
    cashBoxContext?.setIsDirty?.(false)
    onSubmit(data)
  }
  useEffect(() => {
    cashBoxContext?.setIsDirty?.(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues.cashier, formValues.from, formValues.to])
  interface Cashier {
    name: string
    id: string
  }
  const { collaborators } = useCollaborators()

  const cashiers: readonly Cashier[] =
    collaborators?.map(({ name = '', id = '' }) => ({
      name,
      id
    })) || []

  return (
    <form>
      <FormProvider {...methods}>
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

        <Autocomplete
          options={cashiers}
          renderInput={(params) => (
            <TextField
              {...params}
              label={'Seleccionar cajero'}
              placeholder="Todos los cajeros"
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
        <Box className="flex w-full justify-end my-8">
          <LoadingButton
            label="Generar"
            onClick={methods.handleSubmit(_onSubmit)}
            icon="add"
          ></LoadingButton>
        </Box>
      </FormProvider>
    </form>
  )
}

export default CashboxReconciliation
