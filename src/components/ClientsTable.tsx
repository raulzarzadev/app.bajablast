import useModal from '@/hooks/useModal'
import { NewClient, PaymentMethod } from '@/types/user'
import {
  Box,
  Button,
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

const ClientsTable = ({
  clients,
  handleRemove
}: {
  clients: NewClient[]
  handleRemove?: (clientId: NewClient['id']) => void
}) => {
  const totalPayments = clients.reduce((acc, client) => {
    return acc + (client?.payment?.amount || 0)
  }, 0)

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
            {handleRemove && <TableCell align="center">Ops</TableCell>}
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
          <TableCell colSpan={handleRemove ? 3 : 2} align="right">
            Total:
          </TableCell>
          <TableCell align="right">
            <CurrencySpan quantity={totalPayments} />
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
  //FIXME:  this modal is not working but the rest of the modals work fine
  const modalDetails = useModal()
  //* calculate the total of the client counting friends and himself
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
      {handleRemove && (
        <TableCell>
          <ModalPayment client={client} />
          <ModalEditClient client={client} />
        </TableCell>
      )}
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
        Pagar
      </Button>
      <Modal {...modalDetails} title={`Detalle de cliente ${client.name}`}>
        <Box>
          <Typography>
            {client.name} - {client.activity?.name} -
            <CurrencySpan quantity={client.activity?.price} />
          </Typography>
          {client.friends?.map((friend) => (
            <Typography key={friend.name}>
              {friend.name} - {friend.activity?.name} -
              <CurrencySpan quantity={friend.activity?.price} />
            </Typography>
          ))}
        </Box>

        <Box className="flex flex-col w-full justify-evenly mb-8">
          {!!client.payment ? (
            <Box className="flex w-full justify-center my-10">
              <Typography variant="h4" className="mt-10">
                Pagado <CurrencySpan quantity={client.payment.amount} />
              </Typography>
            </Box>
          ) : (
            <>
              {' '}
              <Box className="flex w-full justify-end items-baseline">
                <Typography variant="h6">Total:</Typography>
                <CurrencySpan quantity={total} />
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
                  </RadioGroup>
                </FormControl>
              </Box>
              <Box className="flex w-full justify-evenly">
                <LoadingButton
                  onClick={() => {
                    return handlePay({
                      amount: total,
                      date: new Date(),
                      method: paymentMethod
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
