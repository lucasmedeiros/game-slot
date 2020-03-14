import React, { useState } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import ReviewModal from './components/ReviewModal'

library.add(fas)

const App = () => {
  const [open, setOpen] = useState<boolean>(false)

  const toggleModal = () => {
    setOpen(prev => !prev)
  }

  return (
    <main className="app">
      <button onClick={toggleModal}>Show Modal</button>
      <ReviewModal isOpen={open} toggleModal={toggleModal} />
    </main>
  )
}

export default App
