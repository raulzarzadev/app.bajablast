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
import { Client, Friend } from '@/types/user'

const UsersList = ({ users = [] }: { users?: (Client | Friend)[] }) => {
  return (
    <div>
      <TableContainer component={Paper} className="mx-auto w-full">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell className="font-bold">Fecha Pago</TableCell>
              <TableCell className="font-bold">Usuario</TableCell>
              <TableCell className="font-bold">Tipo </TableCell>
              <TableCell className="font-bold">Pago </TableCell>
              <TableCell className="font-bold" align="center">
                Edad{' '}
              </TableCell>
              <TableCell className="font-bold">Info Médica</TableCell>
              <TableCell className="font-bold">Actividad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user: any) => (
              <TableRow key={user.id}>
                <TableCell>
                  {dateFormat(
                    asDate(user?.payment?.created?.at || user?.paymentDate)
                  )}
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  {user.rol === 'CLIENT' ? 'Cliente' : 'Acompañante'}
                </TableCell>
                <TableCell>
                  <CurrencySpan quantity={user?.payment?.amount} />
                </TableCell>
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
