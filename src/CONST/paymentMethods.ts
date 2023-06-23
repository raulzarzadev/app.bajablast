export const paymentMethods = [
  { key: 'cash', currency: 'mxn', label: 'Efectivo', value: 1 },
  { key: 'card', currency: 'mxn', label: 'Tarjeta', value: 1 },
  { key: 'usd', currency: 'usd', label: 'Dolares', value: 16 }
] as const
export type PaymentMethods = (typeof paymentMethods)[number]['key']
