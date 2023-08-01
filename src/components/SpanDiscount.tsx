const SpanDiscount = ({ discount = 0 }: { discount?: number }) => {
  if (discount <= 0) return null
  return <span className="text-green-600 font-bold">-{discount}%</span>
}

export default SpanDiscount
