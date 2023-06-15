export const dateMx = (date?: Date) =>
  new Intl.DateTimeFormat(['es-Mx']).format(date)
