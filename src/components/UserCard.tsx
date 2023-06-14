'use client'

import useModal from '@/hooks/useModal'
import { Avatar, Box, IconButton, Tooltip, Typography } from '@mui/material'
import Modal from './Modal'
import Image from 'next/image'

const UserCard = () => {
  const modal = useModal()
  return (
    <Box aria-label="user-card" className="flex items-center">
      <div>
        <p aria-label="user-rol">rol-usuario</p>
        <p aria-label="user-name">Nombre de usuario</p>
        <p aria-label="user-age">edad</p>
        <p aria-label="user-email">email</p>
        <p aria-label="user-mobil">Teléfono mobil</p>
        <p aria-label="user-mobil-emergency">Teléfono emergencia</p>
      </div>
      <Tooltip title="Open settings">
        <IconButton
          aria-label="open-user-menu"
          onClick={modal.handleOpen}
          sx={{ p: 0 }}
        >
          <Avatar
            alt="Remy Sharp"
            src={'/logo/bb-blue.png'}
            className="w-28 h-28"
          />
        </IconButton>
      </Tooltip>
      <Modal {...modal}>
        <Image src={'/logo/bb-blue.png'} alt="baja-blast-user" fill />
      </Modal>
    </Box>
  )
}

export default UserCard
