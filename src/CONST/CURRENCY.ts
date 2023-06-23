import { paymentMethods } from './paymentMethods'

export const USD_PRICE = paymentMethods.find((p) => p.key === 'usd')
