const asNumber = (value?: string | number | null) => {
  if (!value) return 0
  if (typeof value === 'number') return value
  const parse = parseFloat(`${value}`)
  if (isNaN(parse)) {
    console.error('invalid as number')
    return 0
  }
  return parse
}
export default asNumber
