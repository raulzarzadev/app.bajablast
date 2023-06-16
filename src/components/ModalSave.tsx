import useModal from '@/hooks/useModal'
import { Button, Typography } from '@mui/material'
import Modal from './Modal'
import { ReactNode } from 'react'

const ModalSave = ({
  handleConfirm,
  children,
  disabled
}: {
  handleConfirm: () => void
  children: ReactNode
  disabled?: boolean
}) => {
  const modal = useModal()
  return (
    <>
      <Button
        onClick={(e) => {
          e.preventDefault()
          modal.handleOpen()
        }}
        disabled={disabled}
        aria-label="button-modal-save"
      >
        Guardar
      </Button>
      <Modal {...modal} title="Guardar">
        {modal.open && children}
        <Typography>Confirma para guardar</Typography>
        <Button
          onClick={(e) => {
            handleConfirm()
          }}
        >
          Guardar
        </Button>
      </Modal>
    </>
  )
}

export default ModalSave
