import { useState } from 'react'

const useModal = (title?: string) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const onClose = () => setOpen(false)
  return {
    open,
    onClose,
    handleOpen,
    title
  }
}

export default useModal
