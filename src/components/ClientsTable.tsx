import useModal from '@/hooks/useModal'
import { NewClient, PaymentMethod } from '@/types/user'
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
import { USD_PRICE } from '@/CONST/CURRENCY'

const ClientsTable = ({
  clients,
  handleRemove
}: {
  clients: NewClient[]
  handleRemove?: (clientId: NewClient['id']) => void
}) => {
  const totalRequested = clients.reduce((acc, client) => {
    //* Get the total of money calculated by the activity price requested and their friends activity
    return (
      acc +
      (client.activity?.price || 0) +
      (client?.friends?.reduce((acc, friend) => {
        return acc + (friend.activity?.price || 0)
      }, 0) || 0)
    )
  }, 0)
  const totalPayments = clients.reduce((acc, client) => {
    return acc + (client?.payment?.amount || 0)
  }, 0)
  const clientsTotal = clients.reduce((acc, client) => {
    return acc + (client?.friends?.length || 0) + 1
  }, 0)
  const awaitingClientTable = clients.some((client) => !client.payment)
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
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Usuarios</TableCell>
            <TableCell align="center">Cantidad</TableCell>
            <TableCell align="center">Ops</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <ClientsRow
              client={client}
              handleRemove={handleRemove}
              key={client.id}
            />
          ))}
        </TableBody>
        <TableFooter>
          <TableCell align="right" colSpan={!handleRemove ? 1 : 2}>
            Total:
          </TableCell>
          <TableCell align="center">{clientsTotal}</TableCell>
          <TableCell align="right">
            <CurrencySpan
              quantity={awaitingClientTable ? totalRequested : totalPayments}
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

  const total =
    (client?.friends?.reduce((acc, friend) => {
      return acc + (friend?.activity?.price || 0)
    }, 0) || 0) + (client?.activity?.price || 0)

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
      <TableCell>{client.name}</TableCell>
      <TableCell align="center">{(client?.friends?.length || 0) + 1}</TableCell>
      <TableCell align="right">
        <CurrencySpan quantity={total} />
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
  const total =
    (client?.friends?.reduce((acc, friend) => {
      return acc + (friend?.activity?.price || 0)
    }, 0) || 0) + (client?.activity?.price || 0)

  const handlePay = async (payment: NewClient['payment']) => {
    const clientId = client.id || ''
    const res = await updateUser(clientId, { payment })
    return
  }

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash')

  const modalDetails = useModal()
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
      <Modal {...modalDetails} title={`Detalle de cliente ${client.name}`}>
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
              dateFormat(client?.created?.at, 'HH:mm dd/MM/yy ')}{' '}
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
                  'HH:mm - dd/MM/yy'
                )}
              </Typography>
              <Typography className="">
                Cobrado por : <ShowUser userId={client?.payment?.created?.by} />
              </Typography>
            </Box>
          ) : (
            <>
              <Box className="flex w-full justify-end items-baseline">
                <Typography>MXN: </Typography>
                <CurrencySpan quantity={total} />
              </Box>
              <Box className="flex w-full justify-end items-baseline">
                <Typography>
                  <span className="text-xs">{`$${USD_PRICE.toFixed(
                    2
                  )}mxn`}</span>{' '}
                  USD:
                </Typography>
                <CurrencySpan quantity={total / USD_PRICE} />
              </Box>
              <Box className="flex w-full justify-center">
                <FormControl className="">
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Metodo de pago
                  </FormLabel>
                  <RadioGroup
                    value={paymentMethod}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value as PaymentMethod)
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
                <LoadingButton
                  onClick={() => {
                    return handlePay({
                      amount: total,
                      date: new Date(),
                      method: paymentMethod,
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
