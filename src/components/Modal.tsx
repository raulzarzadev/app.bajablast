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
  width: 400,
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2
}

const Modal = ({
  open,
  onClose,
  children,
  title
}: {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}) => {
  return (
    <MaterialModal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="">
        <div className="border-white flex w-full justify-between">
          <span>{title && <Typography>{title}</Typography>}</span>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <Box
          component={'main'}
          className="relative w-full h-full min-w-full aspect-square"
        >
          {children}
        </Box>
      </Box>
    </MaterialModal>
  )
}

export default Modal
