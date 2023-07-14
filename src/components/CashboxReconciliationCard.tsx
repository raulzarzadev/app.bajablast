import { Reconciliation } from '@/types/reconciliations'
import asDate from '@/utils/asDate'
import { dateFormat } from '@/utils/utils-date'
import { Box, Typography } from '@mui/material'
import CurrencySpan from './CurrencySpan'

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
    payments
  } = reconciliation
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
      <Typography className="text-center">
        Cajero: {cashier ? cashier.name : 'Todos'}
      </Typography>
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
        <Typography>
          Efectivo: <CurrencySpan quantity={totalCash} />
        </Typography>
        <Typography>
          Dollares: <CurrencySpan quantity={totalDollars} />
        </Typography>
        <Typography>
          Tarjeta: <CurrencySpan quantity={totalCard} />
        </Typography>
        <Typography className="text-center" variant="h5">
          Total: <CurrencySpan quantity={total} />
        </Typography>
      </Box>
    </div>
  )
}

export default CashboxReconciliationCard
