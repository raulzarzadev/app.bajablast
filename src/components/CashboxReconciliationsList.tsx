import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import CurrencySpan from './CurrencySpan'
import { useEffect, useState } from 'react'
import { listenReconciliations } from '@/firebase/reconciliations'
import { Reconciliation } from '@/types/reconciliations'
import { dateFormat } from '@/utils/utils-date'
import asDate from '@/utils/asDate'
import useCollaborators from '@/hooks/useCollaborators'
import Modal from './Modal'
import useModal from '@/hooks/useModal'
import CashboxReconciliationCard from './CashboxReconciliationCard'

const CashboxReconciliationsList = () => {
  const [reconciliations, setReconciliations] = useState<Reconciliation[]>([])
  useEffect(() => {
    listenReconciliations(setReconciliations)
  }, [])
  return (
    <div>
      <Typography>Lista de cortes previos</Typography>
      <Box>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Periodo</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Cajero:</TableCell>
                <TableCell>Hecho por:</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reconciliations.map((reconciliation) => (
                <ReconciliationRow
                  reconciliation={reconciliation}
                  key={reconciliation?.id}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  )
}
const ReconciliationRow = ({
  reconciliation
}: {
  reconciliation: Reconciliation
}) => {
  const { collaborators } = useCollaborators()
  const modal = useModal()
  return (
    <>
      <Modal {...modal} title="Detalle de corte de caje">
        <CashboxReconciliationCard reconciliation={reconciliation} />
      </Modal>
      <TableRow
        onClick={(e) => {
          modal.handleOpen()
        }}
      >
        <TableCell>
          {dateFormat(asDate(reconciliation.created.at), 'dd/MMM/yy HH:mm')}
        </TableCell>
        <TableCell>
          <Typography className="whitespace-nowrap">
            Del:{' '}
            {dateFormat(asDate(reconciliation.dates.from), 'dd/MMM/yy HH:mm')}{' '}
          </Typography>
          <Typography className="whitespace-nowrap">
            al:
            {dateFormat(asDate(reconciliation.dates.to), 'dd/MMM/yy HH:mm')}
          </Typography>
        </TableCell>
        <TableCell>
          <CurrencySpan quantity={reconciliation.total} />
        </TableCell>
        <TableCell>
          {reconciliation?.cashier ? reconciliation.cashier.name : 'Todos'}
        </TableCell>
        <TableCell>
          {
            collaborators?.find(({ id }) => id === reconciliation.created.by)
              ?.name
          }
        </TableCell>
      </TableRow>
    </>
  )
}

export default CashboxReconciliationsList
