import useModal from '@/hooks/useModal'
import { NewClient } from '@/types/user'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import Modal from './Modal'
import LoadingButton from './LoadingButton'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import StepperNewClientContext from './StepperNewClient'
import CurrencySpan from './CurrencySpan'
import { updateUser } from '@/firebase/users'
import useUser from '@/hooks/useUser'
import { dateFormat, dateMx } from '@/utils/utils-date'
import ShowUser from './ShowUser'
import { PaymentMethods } from '@/CONST/paymentMethods'
import { USD_PRICE } from '@/CONST/CURRENCY'
import { Timestamp } from 'firebase/firestore'
import asNumber from '@/utils/asNumber'

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
    const aPaidAt = a?.payment?.created?.at
    const bPaidAt = a?.payment?.created?.at
    const aCreatedAt = a.created?.at
    const bCreatedAt = b.created?.at

    if (
      aCreatedAt instanceof Timestamp &&
      bCreatedAt instanceof Timestamp &&
      aPaidAt instanceof Timestamp &&
      bPaidAt instanceof Timestamp
    ) {
      if (clientsAlreadyPay) {
        const aDate = aPaidAt?.toMillis?.()
        const bDate = bPaidAt?.toMillis?.()
        return bDate - aDate
      } else {
        const aDate = aCreatedAt?.toMillis()
        const bDate = bCreatedAt?.toMillis()
        return aDate - bDate
      }
    }
    return 0
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
          <TableCell align="right" colSpan={!handleRemove ? 2 : 3}>
            Total:
          </TableCell>
          <TableCell align="center">{clientsTotal}</TableCell>
          <TableCell align="right">
            <CurrencySpan
              quantity={clientsAlreadyPay ? totalPayments : totalRequested}
            />
          </TableCell>
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
      return amount - amount * (discount / 100)
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
        {client.payment?.discount && (
          <span className="text-green-600 font-bold">
            -{client.payment.discount}%
          </span>
        )}
        <CurrencySpan quantity={total()} />{' '}
      </TableCell>

      <TableCell>
        <ModalPayment client={client} />
        {handleRemove && (
          <>
            <ModalEditClient client={client} />
          </>
        )}
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
const ModalPayment = ({ client }: { client: NewClient }) => {
  const { user } = useUser()
  const clientAmount = asNumber(client.activity?.price)

  const subtotal =
    client?.friends?.reduce((acc, friend) => {
      const friendAmount = asNumber(friend?.activity?.price)
      return acc + friendAmount
    }, clientAmount) || 0
  const handlePay = async (payment: NewClient['payment']) => {
    const clientId = client.id || ''
    const res = await updateUser(clientId, { payment })
    return
  }

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>('cash')
  const [discount, setDiscount] = useState(0)
  const [amount, setAmount] = useState(0)
  const modalDetails = useModal()
  const total = subtotal - subtotal * (discount / 100)
  return (
    <>
      <Button
        onClick={(e) => {
          e.preventDefault()
          modalDetails.handleOpen()
        }}
        size="small"
      >
        {client.payment ? 'Detalles' : 'Pagar'}
      </Button>
      <Modal {...modalDetails} title={`Detalle de cliente: ${client.name}`}>
        <Box className="my-4">
          <table className="w-full text-center">
            <tbody>
              <tr>
                <th>Nombre</th>
                <th>Paquete</th>
                <th>Cantidad</th>
              </tr>
              <tr>
                <td> {client.name} </td>
                <td>{client.activity?.name}</td>
                <td>
                  <CurrencySpan quantity={client.activity?.price} />
                </td>
              </tr>
              {!!client.friends?.length && (
                <tr>
                  <th colSpan={3}>Acompañantes ({client.friends?.length})</th>
                </tr>
              )}
              {client.friends?.map((friend) => (
                <tr key={friend.name}>
                  <td>{friend.name} </td>
                  <td>{friend.activity?.name}</td>
                  <td>
                    <CurrencySpan quantity={friend.activity?.price} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>

        <Box className="flex w-full justify-evenly text-center items-center my-4">
          <Typography>
            Creado:{' '}
            {client?.created?.at &&
              dateFormat(client?.created?.at, 'dd/MMM HH:mm ')}{' '}
          </Typography>
          <Typography className="whitespace-nowrap">
            Por: <ShowUser userId={client.created?.by} />
          </Typography>
        </Box>

        <Box className="flex flex-col w-full justify-evenly mb-4">
          {!!client.payment ? (
            <Box className="flex w-full justify-center flex-col items-center text-center">
              <Box className=""></Box>
              <Typography variant="h4" className="">
                Pagado <CurrencySpan quantity={client.payment.amount} />
              </Typography>
              <Typography>
                Fecha :{' '}
                {dateFormat(
                  client?.payment?.created?.at || client?.payment.date,
                  'dd/MMM HH:mm'
                )}
              </Typography>
              <Typography className="">
                Cobrado por : <ShowUser userId={client?.payment?.created?.by} />
              </Typography>
              <Box>
                <Button>Cancel</Button>
              </Box>
            </Box>
          ) : (
            <>
              {/*//* ******************************************* AMOUNT IN MXN */}
              <Box className="flex w-full justify-end items-baseline">
                <Typography>MXN: </Typography>
                <CurrencySpan quantity={subtotal} />
              </Box>

              {/*//* ******************************************* AMOUNT IN USD */}
              <Box className="flex w-full justify-end items-baseline">
                <Typography>
                  <span className="text-xs">{`$${USD_PRICE.toFixed(
                    2
                  )}mxn`}</span>{' '}
                  USD:
                </Typography>
                <CurrencySpan quantity={subtotal / USD_PRICE} />
              </Box>
              {/*//* ******************************************* DISCOUNT */}
              <Box className="flex w-full justify-end items-baseline my-2">
                <TextField
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    min: 0,
                    max: 100,
                    step: 5
                  }}
                  className="w-24 "
                  name="discount"
                  label="Descuento"
                  size="small"
                  type="number"
                  value={discount}
                  onChange={(e) => {
                    setDiscount(asNumber(e.target.value))
                  }}
                />
              </Box>
              <Box>
                <Typography variant="h5" className="text-center">
                  Total: <CurrencySpan quantity={total} />
                </Typography>
              </Box>

              <Box className="flex w-full justify-center">
                <FormControl className="">
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Metodo de pago
                  </FormLabel>
                  <RadioGroup
                    value={paymentMethod}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value as PaymentMethods)
                    }}
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="cash"
                      control={<Radio />}
                      label="Efectivo"
                    />
                    <FormControlLabel
                      value="card"
                      control={<Radio />}
                      label="Tarjeta"
                    />
                    <FormControlLabel
                      value="usd"
                      control={<Radio />}
                      label="Dolares"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Box className="flex w-full justify-evenly">
                <TextField
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    min: 0
                  }}
                  className=" "
                  name="amount"
                  label="Recibido"
                  type="number"
                  value={asNumber(amount)}
                  onChange={(e) => {
                    setAmount(asNumber(e.target.value))
                  }}
                  helperText={
                    amount < total
                      ? `Faltan $${asNumber(total - amount).toFixed(2)}`
                      : `Sobran $${asNumber(amount - total).toFixed(2)}`
                  }
                />
                <LoadingButton
                  disabled={amount < total}
                  onClick={() => {
                    return handlePay({
                      amount: subtotal,
                      date: new Date(),
                      method: paymentMethod,
                      discount,
                      created: {
                        by: user?.id,
                        at: new Date()
                      }
                    })
                  }}
                  label="Pagar"
                  icon={<AttachMoneyIcon />}
                />
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  )
}

export default ClientsTable
