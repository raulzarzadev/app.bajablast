'use client'

import useModal from '@/hooks/useModal'
import { Avatar, Box, IconButton, Tooltip, Typography } from '@mui/material'
import Modal from './Modal'
import Image from 'next/image'
import { useContext } from 'react'
import { UserContext } from '@/context/user'
import { client } from '@/CONST/fake-users'
import { dateMx } from '@/utils/utils-date'

const UserCard = () => {
  const modal = useModal()
  const { user } = useContext(UserContext)

  return (
    <Box aria-label="user-card" className="flex items-center">
      <div>
        <p aria-label="user-rol" className="text-end text-sm italic">
          {user?.rol}
        </p>
        <p aria-label="user-name">{user?.name}</p>
        <p aria-label="user-age">{dateMx(user?.birthday)}</p>
        <p aria-label="user-email">{user?.email}</p>
        <p aria-label="user-mobil">{user?.mobile}</p>
        <p aria-label="user-mobil-emergency">{user?.mobile}</p>
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
