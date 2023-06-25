import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { UserType } from '@/types/user'
import { dateFormat } from '@/utils/utils-date'
import { Avatar } from '@mui/material'

export default function CollaboratorsTable({
  collaborators
}: {
  collaborators: UserType[]
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Rol</TableCell>
            <TableCell align="center">Fecha de nacimiento</TableCell>
            <TableCell align="center">Teléfono</TableCell>
            <TableCell align="center">Correo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {collaborators.map((collaborator) => (
            <TableRow
              key={collaborator.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell
                className="flex flex-col justify-center items-center"
                align="center"
                component="th"
                scope="row"
              >
                <Avatar src={collaborator.image} />
                {collaborator.name}
              </TableCell>
              <TableCell align="center">{collaborator.rol}</TableCell>
              <TableCell align="center">
                {dateFormat(collaborator.birthday, 'dd/MM/yy')}
              </TableCell>
              <TableCell align="center" className="whitespace-nowrap">
                {collaborator.phone}
              </TableCell>
              <TableCell align="center">{collaborator.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
