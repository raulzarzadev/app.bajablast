'use client'
import { NewClient } from '@/types/user'
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material'
import Link from 'next/link'
import { useEffect, useId, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import Modal from '@/components/Modal'
import useModal from '@/hooks/useModal'
import StepperNewClientCOntext from '@/components/StepperNewClient'
import LoadingButton from '@/components/LoadingButton'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
const Clients = () => {
  const [clients, setClients] = useState<NewClient[]>([])
  const db = localStorage.getItem('tmp-bb-db')
  useEffect(() => {
    setClients(JSON.parse(db || '[]'))
  }, [db])
  console.log({ clients })
  const handleRemove = (index) => {
    const oldDb = JSON.parse(db || '[]')
    const newClients = [...oldDb.slice(0, index)]
    localStorage.setItem('tmp-bb-db', JSON.stringify(newClients))
    setClients(newClients)
  }

  const awaitingClients = clients.filter((client) => !client.payment)
  const paidClients = clients.filter((client) => !!client.payment)

  return (
    <Box
      component={'section'}
      className="flex flex-col justify-center items-center pt-12 max-w-md mx-auto"
    >
      <Box className="flex flex-col gap-4 mt-4">
        <Button LinkComponent={Link} href="clients/new">
          Nuevo cliente
        </Button>
      </Box>
      <Typography component={'h6'} variant="h6" className="w-full text-left">
        En espera
      </Typography>
      <Box>
        <table>
          <tbody>
            {awaitingClients.map((client, i) => {
              return (
                <ClientsRow
                  key={client?.id}
                  client={client}
                  handleRemove={() => handleRemove(i)}
                />
              )
            })}
          </tbody>
        </table>
      </Box>
      <Typography component={'h6'} variant="h6" className="w-full text-left">
        Pagos
      </Typography>
      <Box>
        <table>
          <tbody>
            {paidClients.map((client, i) => {
              return (
                <ClientsRow
                  key={client?.id}
                  client={client}
                  handleRemove={() => handleRemove(i)}
                />
              )
            })}
          </tbody>
        </table>
      </Box>
    </Box>
  )
}

const ClientsRow = ({
  client,
  handleRemove
}: {
  client: NewClient
  handleRemove: () => void
}) => {
  const total =
    client?.friends?.reduce((acc, friend) => {
      return acc + (friend?.activity?.price || 0)
    }, 0) + (client?.activity?.price || 0)
  const modal = useModal()
  const modalEdit = useModal()
  const handleEdit = () => {
    modalEdit.handleOpen()
  }

  const handlePay = (payment: NewClient['payment']) => {
    const db = JSON.parse(localStorage.getItem('tmp-bb-db') || '[]')
    //* remove old client
    const cleanDB = db.filter(({ id }) => id !== client?.id)
    //* add new client with payment info
    const newDB = [
      ...cleanDB,
      {
        ...client,
        payment
      }
    ]
    localStorage.setItem('tmp-bb-db', JSON.stringify(newDB))

    return new Promise<void>((resolve, reject) => {
      console.log('Pagando')
      setTimeout(() => {
        resolve()
        console.log('Pagando')
      }, 2000)
    })
  }

  const [paymentMethod, setPaymentMethod] =
    useState<NewClient['payment']>('cash')

  return (
    <tr>
      <td>
        <IconButton
          disabled={!!client.payment}
          onClick={(e) => {
            handleRemove()
          }}
        >
          <CloseIcon />
        </IconButton>
      </td>
      <td>{client.name}</td>
      <td>{client?.friends?.length}</td>
      <td>{total}</td>
      <td>
        <Button
          onClick={(e) => {
            modal.handleOpen()
          }}
        >
          Ver
        </Button>
        <Modal {...modal} title={`Detalle de cliente ${client.name}`}>
          <Box>
            <Typography>
              {client.name} - {client.activity?.name} - $
              {client.activity?.price}
            </Typography>
            {client.friends?.map((friend) => (
              <Typography key={friend.name}>
                {friend.name} - {friend.activity?.name} - $
                {friend.activity?.price}
              </Typography>
            ))}
          </Box>

          <Box className="flex flex-col w-full justify-evenly mb-8">
            {!!client.payment ? (
              <Box className="flex w-full justify-center my-10">
                <Typography variant="h4" className="mt-10">
                  Pagado ${client.payment.amount.toFixed(2)}
                </Typography>
              </Box>
            ) : (
              <>
                {' '}
                <Box className="flex w-full justify-end items-baseline">
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h4">${total.toFixed(2)}</Typography>
                </Box>
                <Box className="flex w-full justify-center">
                  <FormControl className="">
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Metodo de pago
                    </FormLabel>
                    <RadioGroup
                      value={paymentMethod}
                      onChange={(e) => {
                        setPaymentMethod(e.target.value)
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
                  <Button
                    onClick={() => {
                      handleEdit()
                    }}
                  >
                    Editar
                  </Button>
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
          {/* <Button
            onClick={(e) => {
              console.log('Pagado')
              
            }}
            >
            Pagar
          </Button> */}
          <Modal {...modalEdit} title={`Editar cliente ${client.name}`}>
            <StepperNewClientCOntext client={client} />
          </Modal>
        </Modal>
      </td>
    </tr>
  )
}

export default Clients
