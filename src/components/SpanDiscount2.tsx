import CurrencySpan from './CurrencySpan'

const SpanDiscount2 = ({ discount = 0, amount = 0 }) => {
  const total = amount - amount * (discount / 100)
  return (
    <span className="grid">
      {discount > 0 && (
        <span className="flex w-full justify-end">
          <span
            className={` 
        ${discount > 0 && 'line-through text-gray-500 text-sm'}`}
          >
            <CurrencySpan quantity={amount} />
          </span>
          <span className="text-green-600 font-bold">-{discount}%</span>
        </span>
      )}

      <CurrencySpan quantity={total} />
    </span>
  )
}

export default SpanDiscount2
