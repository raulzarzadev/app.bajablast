'use client'

import useModal from '@/hooks/useModal'
import { Avatar, Box, IconButton, Tooltip, Typography } from '@mui/material'
import Modal from './Modal'
import Image from 'next/image'
import { useContext } from 'react'
import { UserContext } from '@/context/user'
import { dateMx } from '@/utils/utils-date'
import EditIcon from '@mui/icons-material/Edit'
const UserCard = ({ onEdit }: { onEdit?: () => void }) => {
  const modal = useModal()
  const { user } = useContext(UserContext)
  if (!user) return <div>No user </div>

  return (
    <Box aria-label="user-card" className="flex items-center">
      <div>
        <p aria-label="user-rol" className="text-end text-sm italic">
          {user.isAdmin && 'admin'} {user?.rol}
        </p>
        <div className="flex">
          {onEdit && (
            <span>
              <IconButton
                onClick={(e) => {
                  onEdit()
                }}
              >
                <EditIcon />
              </IconButton>
            </span>
          )}
          <div>
            <p aria-label="user-name">{user?.name} </p>
            <p aria-label="user-age">{dateMx(user?.birthday)}</p>
            <p aria-label="user-email">{user?.email}</p>
            <p aria-label="user-mobil">{user?.phone}</p>
            <p aria-label="user-mobil-emergency">{user?.emergencyPhone}</p>
          </div>
        </div>
      </div>
      <Tooltip title="Open settings ">
        <IconButton
          aria-label="open-user-menu"
          onClick={modal.handleOpen}
          sx={{ p: 0 }}
        >
          <Avatar
            alt="Remy Sharp"
            src={user.image}
            sx={{ width: 76, height: 76 }}
          />
        </IconButton>
      </Tooltip>

      <Modal {...modal}>
        <Image src={user.image} alt="baja-blast-user" fill />
      </Modal>
    </Box>
  )
}

export default UserCard
