import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import AgeSpan from './AgeSpan'
import CurrencySpan from './CurrencySpan'
import { dateFormat } from '@/utils/utils-date'
import asDate from '@/utils/asDate'
import { Friend, NewClient } from '@/types/user'

const UsersList = ({ users = [] }: { users?: (NewClient | Friend)[] }) => {
  const alreadyPaid = users.some(
    //@ts-ignore
    (u) => u?.payment?.created?.at || u?.paymentDate
  )
  const sortByPaymentDate = (a, b) => {
    const aPaymentDate =
      asDate(a.payment?.created?.at || a.paymentDate)?.getDate() || 0
    const bPaymentDate =
      asDate(b.payment?.created?.at || b.paymentDate)?.getDate() || 0
    if (aPaymentDate > bPaymentDate) return -1
    if (aPaymentDate < bPaymentDate) return 1
    return 0
  }
  return (
    <div>
      <TableContainer component={Paper} className="mx-auto w-full">
        <Table size="small">
          <TableHead>
            <TableRow>
              {alreadyPaid && (
                <TableCell className="font-bold">No.Usuario</TableCell>
              )}
              {alreadyPaid && (
                <TableCell className="font-bold">Fecha Pago</TableCell>
              )}
              <TableCell className="font-bold">No.</TableCell>
              <TableCell className="font-bold">Nombre</TableCell>
              <TableCell className="font-bold">Tipo </TableCell>
              {alreadyPaid && (
                <TableCell className="font-bold">Pago </TableCell>
              )}
              <TableCell className="font-bold" align="center">
                Edad{' '}
              </TableCell>
              <TableCell className="font-bold">Info Médica</TableCell>
              <TableCell className="font-bold">Actividad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.sort(sortByPaymentDate).map((user: any, i) => (
              <TableRow key={user.id}>
                {alreadyPaid && (
                  <TableCell>{user?.userNumber || '-'}</TableCell>
                )}
                {alreadyPaid && (
                  <TableCell className="whitespace-nowrap">
                    {dateFormat(
                      asDate(user?.payment?.created?.at || user?.paymentDate),
                      'dd/MMM HH:mm'
                    )}
                  </TableCell>
                )}
                <TableCell>{0}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  {user.rol === 'CLIENT' ? 'Cliente' : 'Acompañante'}
                </TableCell>
                {alreadyPaid && (
                  <TableCell>
                    <CurrencySpan quantity={user?.payment?.amount} />
                  </TableCell>
                )}
                <TableCell align="center">
                  <AgeSpan birthday={user.birthday} />
                </TableCell>
                <TableCell>{user.medicalInfo}</TableCell>
                <TableCell>{user.activity.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UsersList
