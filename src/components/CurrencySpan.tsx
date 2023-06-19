import { Typography } from '@mui/material'

const CurrencySpan = ({
  quantity = 0,
  ...rest
}: {
  quantity?: number | string
}) => {
  return (
    <span {...rest}>
      {' '}
      {new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
      }).format(parseInt(`${quantity}`))}{' '}
    </span>
  )
}

export default CurrencySpan
