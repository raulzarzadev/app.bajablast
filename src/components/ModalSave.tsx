import useModal from '@/hooks/useModal'
import { Box, Button, Typography } from '@mui/material'
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
        variant="outlined"
      >
        Guardar
      </Button>
      <Modal {...modal} title="Guardar">
        {modal.open && children}
        <Typography>Confirma para guardar</Typography>
        <Box className="flex justify-center mt-12">
          <Button
            variant="outlined"
            type="submit"
            onClick={(e) => {
              handleConfirm()
            }}
          >
            Guardar
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default ModalSave
