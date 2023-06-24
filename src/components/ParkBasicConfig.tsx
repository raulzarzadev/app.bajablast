import { USD_PRICE } from '@/CONST/CURRENCY'
import CurrencySpan from './CurrencySpan'

const ParkBasicConfig = () => {
  return (
    <div>
      Precio del dolar <CurrencySpan quantity={USD_PRICE} />
    </div>
  )
}

export default ParkBasicConfig
