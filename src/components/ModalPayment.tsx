'use client'
import { PaymentMethods, paymentMethods } from '@/CONST/paymentMethods'
import useModal from '@/hooks/useModal'
import useUser from '@/hooks/useUser'
import { Friend, NewClient } from '@/types/user'
import asNumber from '@/utils/asNumber'
import {
  Box,
  Button,
  Checkbox,
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
import { dateFormat } from '@/utils/utils-date'
import LoadingButton from './LoadingButton'
import asDate from '@/utils/asDate'
import addDiscount from '@/utils/addDiscount'
import { updateClient } from '@/firebase/clients'
import { USER_ROL } from '@/CONST/user'
import useParkConfig from '@/hooks/useParkConfig'
import UsersList from './UsersList'
import { getActivity } from '@/firebase/activities'

import useCollaborators from '@/hooks/useCollaborators'
const activityRequireInsurance = async (activityId?: string) => {
  if (activityId)
    return await getActivity(activityId).then((activity) => {
      return !!activity.requiresInsurance
    })
}

const assignInsurancePolicy = async (
  user: NewClient | Friend,
  currentPolicyNumber: number
) => {
  const activityRequiresInsurance = await activityRequireInsurance(
    user.activity?.id
  )
  return {
    ...user,
    insurancePolicyNumber: activityRequiresInsurance
      ? currentPolicyNumber + 1
      : 'n/a'
  }
}

const ModalPayment = ({ client }: { client: NewClient }) => {
  const { user } = useUser()
  const { parkConfig } = useParkConfig()
  const clientAmount = asNumber(client.activity?.price)
  const USD_PRICE = asNumber(parkConfig?.dollarPrice)
  const subtotal =
    client?.friends?.reduce((acc, friend) => {
      const friendAmount = asNumber(friend?.activity?.price)
      return acc + friendAmount
    }, clientAmount) || 0

  const handlePay = async () => {
    try {
      const clientId = client.id || ''
      const payment: NewClient['payment'] = {
        amount: subtotal,
        date: new Date(),
        method: paymentMethod,
        discount,
        created: {
          by: user?.id,
          at: new Date()
        },
        dollarPrice: USD_PRICE
      }
      const res = await updateClient(clientId, { payment })
    } catch (error) {
      console.error(error)
    }

    return
  }

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>('cash')
  const [discount, setDiscount] = useState(0)
  const [amount, setAmount] = useState(0)
  const modalDetails = useModal()
  const total = subtotal - subtotal * (discount / 100)
  const showDiscountInput = false //user?.isAdmin || user?.rol === USER_ROL.COORDINATOR
  const handleOpenEdit = () => {
    modalDetails.handleOpen()
  }
  const handleSetAmount = (amount: number) => {
    setAmount(amount)
  }

  const amountInMXN = paymentMethod === 'usd' ? amount * USD_PRICE : amount

  const handleSetAsCortesia = (isFree: boolean) => {
    setDiscount(isFree ? 100 : 0)
  }
  return (
    <>
      <Button
        onClick={(e) => {
          e.preventDefault()
          handleOpenEdit()
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
                      // pattern: '[0-9]*',
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

              <Box className="justify-end flex w-full">
                <FormControlLabel
                  onChange={(e) => {
                    //@ts-ignore
                    handleSetAsCortesia(e.target?.checked as boolean)
                  }}
                  label="Es cortesia"
                  control={<Checkbox />}
                />
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
                  value={asNumber(amount) || ''}
                  onChange={(e) => {
                    handleSetAmount(asNumber(e.target.value))
                  }}
                  helperText={
                    amountInMXN < total
                      ? `Faltan $${asNumber(total - amountInMXN).toFixed(2)}`
                      : `Sobran $${asNumber(amountInMXN - total).toFixed(2)}`
                  }
                />
                <LoadingButton
                  disabled={amountInMXN < total}
                  variant="contained"
                  color="success"
                  onClick={() => {
                    return handlePay()
                  }}
                  label="Pagar"
                  icon={'money'}
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
  const users = [client, ...(client.friends || [])]
  return (
    <Box className="my-4">
      <Typography className="text-end">
        {client?.created?.at &&
          dateFormat(client?.created?.at, 'dd/MMM HH:mm ')}{' '}
      </Typography>
      <UsersList users={users} />
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
  const { collaborators } = useCollaborators()
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
          {payment.discount > 0 && (
            <p>
              <span>Descuento:</span>
              <Typography color={'green'} component={'span'}>
                -{payment.discount}%
              </Typography>
            </p>
          )}
          <span className="text-sm font-normal">
            Metodo de pago:{' '}
            {paymentMethods.find((p) => p.key === payment.method)?.label}
            {payment.method === 'usd' && ` ($${payment.dollarPrice})`}
          </span>
          <Typography>
            {dateFormat(
              asDate(payment.created.at || payment.date),
              'dd/MMM HH:mm'
            )}
          </Typography>
          <Typography>
            Cobrado por:{' '}
            {payment.created.by &&
              collaborators?.find((c) => c.id === payment.created.by)?.name}
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
            <Typography component={'span'} className="text-xs">
              (<CurrencySpan quantity={dollarPrice} />)
            </Typography>
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
  const showDiscountInput = user?.isAdmin || user?.rol === USER_ROL.COORDINATOR

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
