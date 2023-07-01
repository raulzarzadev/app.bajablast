'use client'
import { PaymentMethods } from '@/CONST/paymentMethods'
import { updateUser } from '@/firebase/users'
import useModal from '@/hooks/useModal'
import useUser from '@/hooks/useUser'
import { NewClient } from '@/types/user'
import asNumber from '@/utils/asNumber'
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material'
import { useState } from 'react'
import Modal from './Modal'
import CurrencySpan from './CurrencySpan'
import ShowUser from './ShowUser'
import { dateFormat } from '@/utils/utils-date'
import { USD_PRICE } from '@/CONST/CURRENCY'
import LoadingButton from './LoadingButton'
import AppIcon from './AppIcon'
import asDate from '@/utils/asDate'
import addDiscount from '@/utils/addDiscount'

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
    //const res = await updateUser(clientId, { payment })

    return
  }

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>('cash')
  const [discount, setDiscount] = useState(0)
  const [amount, setAmount] = useState(0)
  const modalDetails = useModal()
  const total = subtotal - subtotal * (discount / 100)
  const showDiscountInput = user?.isAdmin || user?.rol === 'COORDINATOR'

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
        <PaymentClientTable client={client} />

        <Box className="flex flex-col w-full justify-evenly mb-4">
          {!!client.payment ? (
            <>
              <AmountInfo payment={client.payment} />
              <ModalEditPayment payment={client.payment} />
            </>
          ) : (
            <>
              <AmountInfo
                discount={discount}
                subtotal={subtotal}
                dollarPrice={USD_PRICE}
              />

              {showDiscountInput && (
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
              )}
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
              <Box className="flex w-full justify-evenly items-center my-4">
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
                  variant="contained"
                  color="success"
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
                  icon={<AppIcon icon="money" />}
                />
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  )
}

const PaymentClientTable = ({ client }: { client: NewClient }) => {
  return (
    <Box className="my-4">
      <Typography className="text-end">
        {client?.created?.at &&
          dateFormat(client?.created?.at, 'dd/MMM HH:mm ')}{' '}
      </Typography>
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
          {/* {!!client.friends?.length && (
            <tr>
              <th colSpan={3}>Acompañantes ({client.friends?.length})</th>
            </tr>
          )} */}
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
      <Box className="flex w-full justify-evenly text-center items-center my-4">
        {/* <Typography className="whitespace-nowrap">
            Por: <ShowUser userId={client.created?.by} />
          </Typography> */}
      </Box>
    </Box>
  )
}

const AmountInfo = ({
  subtotal = 0,
  discount = 0,
  dollarPrice = 0,
  payment
}: {
  subtotal?: number
  discount?: number
  dollarPrice?: number
  payment?: NewClient['payment']
}) => {
  const total = addDiscount(subtotal, discount)
  return (
    <>
      {payment ? (
        <Box className="text-center">
          <Typography>Pagado</Typography>
          <Typography variant="h5">
            <CurrencySpan
              quantity={addDiscount(payment.amount, payment.discount)}
            />
          </Typography>
          <Typography>
            {dateFormat(
              asDate(payment.created.at || payment.date),
              'dd/MMM HH:mm'
            )}
          </Typography>
        </Box>
      ) : (
        <Box className="text-end">
          {!!discount && (
            <>
              <Typography>
                Subtotal:
                <CurrencySpan quantity={subtotal} />{' '}
              </Typography>
              <Typography>
                Descuento:
                <Typography component={'span'}> %{discount}</Typography>
              </Typography>
            </>
          )}
          <Typography>
            <Typography component={'span'}>
              <CurrencySpan quantity={total} />
              {'mxn'}
            </Typography>
          </Typography>
          <Typography>
            <Typography component={'span'}>
              <CurrencySpan quantity={total / dollarPrice} />
              {'usd'}
            </Typography>
          </Typography>
        </Box>
      )}
    </>
  )
}

const ModalEditPayment = ({ payment }: { payment: NewClient['payment'] }) => {
  const { user } = useUser()
  const showDiscountInput = user?.isAdmin || user?.rol === 'COORDINATOR'

  const modalEdit = useModal()
  const handleOpenEdit = () => {
    modalEdit.handleOpen()
  }

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={(e) => {
          e.preventDefault()
          handleOpenEdit()
        }}
      >
        Editar
      </Button>
      <Modal {...modalEdit} title="Editar pago">
        <Typography>Editar Pago</Typography>
        <>
          <AmountInfo payment={payment} />
          {/* {showDiscountInput && (
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
          )}
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
          <Box className="flex w-full justify-evenly items-center my-4">
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
              variant="contained"
              color="success"
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
              label="Editar"
              icon={<AppIcon icon="money" />}
            />
          </Box> */}
        </>
      </Modal>
    </>
  )
}
export default ModalPayment
