import useModal from '@/hooks/useModal'
import { NewClient } from '@/types/user'
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Modal from './Modal'
import StepperNewClientContext from './StepperNewClient'
import CurrencySpan from './CurrencySpan'
import { dateFormat } from '@/utils/utils-date'
import { Timestamp } from 'firebase/firestore'
import asNumber from '@/utils/asNumber'
import ModalPayment from './ModalPayment'
import asDate from '@/utils/asDate'
import addDiscount from '@/utils/addDiscount'

const ClientsTable = ({
  clients,
  handleRemove
}: {
  clients: NewClient[]
  handleRemove?: (clientId: NewClient['id']) => void
}) => {
  const totalRequested = clients.reduce((acc, client) => {
    //* Get the total of money calculated by the activity price requested and their friends activity
    const clientActivityPrice = asNumber(client.activity?.price)
    return (
      acc +
      clientActivityPrice +
      (client?.friends?.reduce((acc, friend) => {
        const friendActivityPrice = asNumber(friend.activity?.price)
        return acc + friendActivityPrice
      }, 0) || 0)
    )
  }, 0)

  const totalPayments = clients.reduce((acc, client) => {
    const clientAmount = parseFloat(`${client?.payment?.amount || 0}`)
    const clientDiscount = parseFloat(`${client?.payment?.discount || 0}`)
    return acc + clientAmount - clientAmount * (clientDiscount / 100)
  }, 0)
  const clientsTotal = clients.reduce((acc, client) => {
    return acc + (client?.friends?.length || 0) + 1
  }, 0)
  const clientsAlreadyPay = clients.some((client) => client.payment)

  const sortByDate = (a: NewClient, b: NewClient) => {
    if (clientsAlreadyPay) {
      const aPaidAt = asDate(a?.payment?.created?.at)
      const bPaidAt = asDate(b?.payment?.created?.at)
      const aDate = aPaidAt?.getTime() || 0
      const bDate = bPaidAt?.getTime() || 0
      return bDate - aDate
    } else {
      const aCreatedAt = asDate(a.created?.at)
      const bCreatedAt = asDate(b.created?.at)
      const aDate = aCreatedAt?.getTime() || 0
      const bDate = bCreatedAt?.getTime() || 0
      return bDate - aDate
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table
        //sx={{ minWidth: 650, width: '100%' }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow>
            {handleRemove && <TableCell>Elim</TableCell>}
            <TableCell align="center">Fecha</TableCell>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Usuarios</TableCell>
            <TableCell align="center">Cantidad</TableCell>
            <TableCell align="center">Ops</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.sort(sortByDate).map((client) => (
            <ClientsRow
              client={client}
              handleRemove={handleRemove}
              key={client.id}
            />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell align="right" colSpan={!handleRemove ? 2 : 3}>
              Total:
            </TableCell>
            <TableCell align="center">{clientsTotal}</TableCell>
            <TableCell align="right">
              <CurrencySpan
                quantity={clientsAlreadyPay ? totalPayments : totalRequested}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

const ClientsRow = ({
  client,
  handleRemove
}: {
  client: NewClient
  handleRemove?: (clientId: NewClient['id']) => void
}) => {
  const modalDetails = useModal()
  const clientAlreadyPaid = !!client.payment

  const total = (): number => {
    const clientActivityAmount = asNumber(client?.activity?.price)
    if (clientAlreadyPaid) {
      const discount = asNumber(client.payment?.discount)
      const amount = asNumber(client.payment?.amount)
      if (!discount) return amount
      return addDiscount(amount, discount)
    } else {
      return (
        client?.friends?.reduce((acc, friend) => {
          const friendActivityAmount = asNumber(friend?.activity?.price)
          return acc + friendActivityAmount
        }, clientActivityAmount) || 0
      )
    }
  }

  const createdAt = client?.created?.at
  const paymentAt = client?.payment?.created?.at || client?.payment?.date
  return (
    <TableRow
      onClick={(e) => {
        modalDetails.handleOpen()
      }}
    >
      {handleRemove && (
        <TableCell>
          <IconButton
            disabled={!!client.payment}
            onClick={(e) => {
              handleRemove?.(client?.id)
            }}
          >
            <CloseIcon />
          </IconButton>
        </TableCell>
      )}
      <TableCell align="center">
        {paymentAt && (
          <div className="whitespace-nowrap text-xs">
            <span>Pagado: </span>
            <span>{dateFormat(paymentAt, 'dd/MMM HH:mm')}</span>
          </div>
        )}
        {createdAt && (
          <div className="whitespace-nowrap text-xs">
            <span>Creado: </span>
            <span>{dateFormat(createdAt, 'dd/MMM HH:mm')}</span>
          </div>
        )}
      </TableCell>

      <TableCell>{client.name}</TableCell>
      <TableCell align="center">{(client?.friends?.length || 0) + 1}</TableCell>
      <TableCell align="right">
        {!!client.payment?.discount && (
          <span className="text-green-600 font-bold">
            -{client.payment.discount}%
          </span>
        )}
        <CurrencySpan quantity={total()} />{' '}
      </TableCell>

      <TableCell>
        <ModalPayment client={client} />
        {handleRemove && <ModalEditClient client={client} />}
      </TableCell>
    </TableRow>
  )
}
const ModalEditClient = ({ client }: { client: NewClient }) => {
  const modal = useModal()
  return (
    <>
      <Button
        size="small"
        onClick={(e) => {
          e.preventDefault()
          modal.handleOpen()
        }}
      >
        Edit
      </Button>
      <Modal {...modal} title={`Editar cliente ${client.name}`}>
        <StepperNewClientContext client={client} />
      </Modal>
    </>
  )
}

export default ClientsTable
