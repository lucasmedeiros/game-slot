/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState } from 'react'

const useModal = () => {
  const [open, setOpen] = useState<boolean>(false)

  const show = () => setOpen(true)
  const hide = () => setOpen(false)

  return { open, show, hide }
}

export default useModal
