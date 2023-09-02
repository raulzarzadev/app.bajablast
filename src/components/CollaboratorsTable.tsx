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
import useModal from '@/hooks/useModal'
import UserCard from './UserCard'
import Modal from './Modal'
import ClientForm from './ClientForm'
import useUser from '@/hooks/useUser'
import { updateUser } from '@/firebase/users'

export default function CollaboratorsTable({
  collaborators = []
}: {
  collaborators?: UserType[]
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
            <CollaboratorRow
              collaborator={collaborator}
              key={collaborator.id}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
const CollaboratorRow = ({ collaborator }: { collaborator: UserType }) => {
  const modal = useModal()
  const [editing, setEditing] = React.useState(false)
  const { user } = useUser()
  const handleUpdateUser = async (data) => {
    return await updateUser(data.id, { ...data })
  }
  return (
    <>
      <TableRow
        key={collaborator.name}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        onClick={(e) => {
          modal.handleOpen()
        }}
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
      <Modal {...modal} title={`Detalles de ${collaborator.name}`}>
        {user?.isAdmin && editing ? (
          <ClientForm
            client={collaborator}
            handleSubmit={async (data) => {
              await handleUpdateUser(data)
              setEditing(false)
              return 
            }}
            editRol={user?.isAdmin}
          />
        ) : (
          <UserCard
            user={collaborator}
            onEdit={
              user?.isAdmin
                ? () => {
                    setEditing(true)
                  }
                : undefined
            }
          />
        )}
      </Modal>
    </>
  )
}
