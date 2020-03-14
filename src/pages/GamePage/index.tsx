import React from 'react'
import useModal from '../../hooks/useModal'
import { Button } from '../../styles'
import ReviewModal from '../../components/ReviewModal'

const GamePage: React.FC = () => {
  const { open, hide, show } = useModal()

  return (
    <div>
      <Button onClick={show}>Avaliar jogo</Button>
      <ReviewModal isOpen={open} onClose={hide} />
    </div>
  )
}

export default GamePage
