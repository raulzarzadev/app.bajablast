import { useState } from 'react'

const useModal = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const onClose = () => setOpen(false)
  return {
    open,
    onClose,
    handleOpen
  }
}

export default useModal
