import {
  Box,
  Button,
  IconButton,
  Modal as MaterialModal,
  Typography
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  //width: 400,
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24
}
export type ModalProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}
const Modal = ({ open, onClose, children, title }: ModalProps) => {
  return (
    <MaterialModal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={style}
        className="w-full max-w-lg max-h-screen overflow-y-auto relative "
      >
        <Box
          component={'header'}
          className=" flex w-full justify-between items-center sticky top-0 z-50 bg-white p-1 pb-0 shadow-md  "
        >
          <span>{title && <Typography>{title}</Typography>}</span>
          <IconButton
            onClick={() => {
              onClose()
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          component={'main'}
          className="relative w-full h-full min-w-full min-h-[300px] p-3 "
        >
          {children}
        </Box>
      </Box>
    </MaterialModal>
  )
}

export default Modal
