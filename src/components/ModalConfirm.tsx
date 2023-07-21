import { Box, Button } from '@mui/material'
import Modal, { ModalProps } from './Modal'

const ModalConfirm = (
  props: ModalProps & {
    buttonConfirmProps: {
      onClick: () => void | Promise<any>
      color?: 'success' | 'error'
      label?: string
    }
  }
) => {
  const onConfirm = props.buttonConfirmProps?.onClick
  const confirmColor = props.buttonConfirmProps?.color
  const label = props.buttonConfirmProps?.label || 'Confirmar'
  return (
    <div>
      <Modal {...props}>
        {props.children}
        <Box className={'flex w-full justify-evenly my-4'}>
          <Button
            variant="outlined"
            onClick={(e) => {
              e.preventDefault()
              props.onClose()
            }}
          >
            Cancelar
          </Button>

          {onConfirm && (
            <Button
              color={confirmColor}
              variant="outlined"
              onClick={async (e) => {
                e.preventDefault()
                await onConfirm()
                props.onClose()
              }}
            >
              {label}
            </Button>
          )}
        </Box>
      </Modal>
    </div>
  )
}

export default ModalConfirm
