const CurrencySpan = ({
  quantity = 1,
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
      }).format(parseFloat(`${quantity || 1}`))}{' '}
    </span>
  )
}

export default CurrencySpan
