import { Reconciliation } from '@/types/reconciliations'
import asDate from '@/utils/asDate'
import { dateFormat } from '@/utils/utils-date'
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import CurrencySpan from './CurrencySpan'
import asNumber from '@/utils/asNumber'
import { useState } from 'react'
import SpanDiscount2 from './SpanDiscount2'

const CashboxReconciliationCard = ({
  reconciliation
}: {
  reconciliation: Partial<Reconciliation>
}) => {
  const {
    activities,
    total,
    cashier,
    totalCard,
    totalDollars,
    totalCash,
    payments,
    cancellations,
    discounts
  } = reconciliation
  const totalCancellations = cancellations?.reduce(
    (acc, curr) => acc + asNumber(curr?.payment?.amount),
    0
  )
  const [showDetails, setShowDetails] = useState(false)
  const handleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const totalDiscounted =
    discounts?.reduce((acc, curr) => {
      const amount = asNumber(curr?.amount)
      const discount = asNumber(curr?.discount)
      return acc + amount * (discount / 100)
    }, 0) || 0

  return (
    <div>
      <Box className="flex justify-end">
        <Typography className="mx-2">
          Desde:{' '}
          {dateFormat(asDate(reconciliation.dates?.from), ' dd/MMM/yy HH:mm ')}
        </Typography>
        <Typography className="mx-2">
          Hasta:{' '}
          {dateFormat(asDate(reconciliation.dates?.to), ' dd/MMM/yy HH:mm ')}
        </Typography>
      </Box>
      <Typography className="text-center mb-4">
        Cajero:{' '}
        <span className="font-bold"> {cashier ? cashier.name : 'Todos'}</span>
      </Typography>
      {showDetails && <PaymentsDetails payments={reconciliation.payments} />}

      <Box className="w-1/2 text-end my-4">
        <Typography className="font-bold">Actividades</Typography>
        {Object.entries(activities || {}).map(([name, activities]) => (
          <Box key={name}>
            <Typography>
              {name}: {activities?.length || 0}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box className="text-end">
        <Typography>Pagos: {payments?.length || 0}</Typography>
        <Typography>Cancelaciones: {cancellations?.length || 0}</Typography>

        <Typography>
          Efectivo: <CurrencySpan quantity={totalCash} />
        </Typography>
        <Typography>
          Dollares: <CurrencySpan quantity={totalDollars} />
        </Typography>
        <Typography>
          Tarjeta: <CurrencySpan quantity={totalCard} />
        </Typography>
        <Box className="w-1/2 mx-auto flex flex-col text-end">
          <Typography className="text-end" variant="h6">
            SubTotal: <CurrencySpan quantity={total} />
          </Typography>
          <Typography className="text-end" variant="h6">
            Cancelaciones: <CurrencySpan quantity={totalCancellations} />
          </Typography>
          <Typography>
            Descuentos: <CurrencySpan quantity={totalDiscounted} />
          </Typography>
          <Typography className="text-end" variant="h5">
            Total:{' '}
            <CurrencySpan
              quantity={(total || 0) - totalCancellations - totalDiscounted}
            />
          </Typography>
        </Box>
        <Button
          onClick={(e) => {
            handleShowDetails()
          }}
        >
          Mostrar Detalles
        </Button>
      </Box>
    </div>
  )
}

const PaymentsDetails = ({
  payments
}: {
  payments?: Partial<Reconciliation['payments']>
}) => {
  return (
    <Box>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Metodo</TableCell>
              <TableCell align="center">Estatus</TableCell>

              <TableCell align="right">Monto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments
              ?.sort(
                (a, b) =>
                  (asDate(b?.date)?.getTime() || 0) -
                  (asDate(a?.date)?.getTime() || 0)
              )
              .map((payment) => {
                return (
                  <TableRow key={payment?.clientId}>
                    <TableCell>
                      {dateFormat(asDate(payment?.date), 'dd/MMM/yy HH:mm')}
                    </TableCell>
                    <TableCell>{payment?.method}</TableCell>
                    <TableCell align="center">
                      {payment?.isCancelled && 'Cancelado'}
                    </TableCell>
                    <TableCell align="right">
                      <SpanDiscount2
                        amount={payment?.amount}
                        discount={payment?.discount}
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default CashboxReconciliationCard
