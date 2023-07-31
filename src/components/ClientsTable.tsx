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
  TableRow,
  Typography
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
import { paymentMethods } from '@/CONST/paymentMethods'
import ModalConfirm from './ModalConfirm'
import { activities } from '@/CONST/fake-activities'

const ClientsTable = ({
  clients,
  handleRemove
}: {
  clients: NewClient[]
  handleRemove?: (clientId: NewClient['id']) => void
}) => {
  // const clientsTotal = clients.reduce((acc, curr) => {
  //   return acc + activitiesTotalAmount(clientAndFriendsActivities(curr))
  // }, 0)

  // console.log(t)

  // const totalRequested = clients.reduce((acc, client) => {
  //   //* Get the total of money calculated by the activity price requested and their friends activity
  //   const clientActivityPrice = asNumber(client.activity?.price)
  //   const activitiesClientTotal =
  //     client.activities?.reduce((acc, curr) => acc + asNumber(curr.price), 0) ||
  //     0

  //   const activitiesFriendsTotal =
  //     client.friends?.reduce(
  //       (acc, friend) =>
  //         acc +
  //         asNumber(
  //           friend?.activities?.reduce(
  //             (acc, curr) => acc + asNumber(curr.price),
  //             0
  //           )
  //         ),
  //       0
  //     ) || 0

  //   return activitiesFriendsTotal + activitiesClientTotal

  //   return (
  //     acc +
  //     clientActivityPrice +
  //     (client?.friends?.reduce((acc, friend) => {
  //       const friendActivityPrice = asNumber(friend.activity?.price)
  //       return acc + friendActivityPrice
  //     }, 0) || 0)
  //   )
  // }, 0)

  // console.log({ totalRequested })

  // const totalPayments = clients.reduce((acc, client) => {
  //   const clientAmount = parseFloat(`${client?.payment?.amount || 0}`)
  //   const clientDiscount = parseFloat(`${client?.payment?.discount || 0}`)
  //   return acc + clientAmount - clientAmount * (clientDiscount / 100)
  // }, 0)
  // const clientsTotal = clients.reduce((acc, client) => {
  //   return acc + (client?.friends?.length || 0) + 1
  // }, 0)
  // const clientsAlreadyPay = clients.some((client) => client.payment)
  // const cancellationsTotal = clients.reduce((acc, client) => {
  //   const canceledAmount = client.payment?.isCancelled
  //     ? asNumber(client.payment.amount)
  //     : 0
  //   return acc + canceledAmount
  // }, 0)
  // const cancellations = clients.filter(
  //   (client) => client.payment?.isCancelled
  // ).length
  // console.log({ cancellationsTotal })
  const sortByDate = (a: NewClient, b: NewClient) => {
    const aCreatedAt = asDate(a.created?.at)
    const bCreatedAt = asDate(b.created?.at)
    const aDate = aCreatedAt?.getTime() || 0
    const bDate = bCreatedAt?.getTime() || 0
    return bDate - aDate
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
            <TableCell align="center">Metodo</TableCell>
            <TableCell align="center">Status</TableCell>
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
        {/* <TableFooter>
          <TableRow>
            <TableCell align="right" colSpan={!handleRemove ? 2 : 3}>
              Subtotal:
            </TableCell>
            <TableCell align="center">{clientsTotal}</TableCell>
            <TableCell align="right">
              <CurrencySpan
                quantity={clientsAlreadyPay ? totalPayments : totalRequested}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right" colSpan={!handleRemove ? 2 : 3}>
              Cancelaciones:
            </TableCell>
            <TableCell align="center">{cancellations}</TableCell>
            <TableCell align="right">
              <CurrencySpan
                quantity={
                  clientsAlreadyPay
                    ? totalPayments - cancellationsTotal
                    : totalRequested
                }
              />
            </TableCell>
          </TableRow>
        </TableFooter> */}
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
  const removeModal = useModal()
  const modalDetails = useModal()
  const clientAlreadyPaid = !!client.payment

  const createdAt = client?.created?.at
  const paymentAt = client?.payment?.created?.at || client?.payment?.date

  const total = activitiesTotalAmount(clientAndFriendsActivities(client))

  return (
    <TableRow
      onClick={(e) => {
        modalDetails.handleOpen()
      }}
    >
      {handleRemove && (
        <>
          <TableCell>
            <ModalConfirm
              {...removeModal}
              title="Remover cliente"
              buttonConfirmProps={{
                onClick: () => handleRemove?.(client?.id),
                color: 'success'
              }}
            >
              <Typography className="text-center my-8">
                ¿Deseas remover este cliente de la fila?
              </Typography>
            </ModalConfirm>
            <IconButton
              disabled={!!client.payment}
              onClick={(e) => {
                removeModal.handleOpen()
              }}
            >
              <CloseIcon />
            </IconButton>
          </TableCell>
        </>
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
        <CurrencySpan quantity={total} />{' '}
      </TableCell>
      <TableCell>
        {
          paymentMethods.find(({ key }) => key === client.payment?.method)
            ?.label
        }
      </TableCell>
      <TableCell>
        {client.payment?.isCancelled ? 'Cancelado' : 'Valido'}
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

export const clientAndFriendsActivities = (
  client: NewClient
): NewClient['activities'] => {
  const clientActivities: NewClient['activities'] = [
    ...(client.activities || [])
  ]
  if (client.activity) clientActivities.push(client.activity)
  const friendsActivities: NewClient['activities'] = [
    ...(client?.friends?.map((f) => f.activities || []).flat() || [])
  ]
  client.friends?.forEach((friend) => {
    if (friend.activity) friendsActivities.push(friend.activity)
  })
  return [...clientActivities, ...friendsActivities]
}

export const activitiesTotalAmount = (
  activities: NewClient['activities']
): number => {
  return (
    activities?.reduce((acc, curr) => {
      return acc + asNumber(curr?.price)
    }, 0) || 0
  )
}

export default ClientsTable
