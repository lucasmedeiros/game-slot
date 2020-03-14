import React from 'react'
import useModal from '../../hooks/useModal'
import ReviewModal from '../../components/ReviewModal'

const Home: React.FC = () => {
  const { open, hide, show } = useModal()
  return (
    <div>
      <button onClick={show}>Show Modal</button>
      <ReviewModal isOpen={open} onClose={hide} />
    </div>
  )
}

export default Home
