import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { ClipLoader } from 'react-spinners'
import useModal from '../../hooks/useModal'
import { GamePageHeader } from '../../styles'
import ReviewModal from '../../components/ReviewModal'
import useGameDetails from '../../hooks/useGameDetails'
import { getRandomItemFromArray, preLoadImage } from '../../utils'
import GamePageDetails from './GamePageDetails'
import GamePageNotFound from './GamePageNotFound'
import GamePageTrailer from './GamePageTrailer'

interface GamePageParams {
  id: string
}

const GamePage: React.FC = () => {
  const { open, hide, show } = useModal()
  const { id } = useParams<GamePageParams>()
  const { details, loading, error } = useGameDetails(id)
  const [image, setImage] = useState<string>()

  useEffect(() => {
    async function chooseScreenshotToDisplay() {
      if (details?.screenshots) {
        const imageURL = getRandomItemFromArray(details.screenshots)
        const imageBase64 = await preLoadImage(imageURL)
        setImage(imageBase64 ?? '')
      }
    }
    chooseScreenshotToDisplay()
  }, [details])

  return (
    <div>
      <GamePageHeader backgroundImage={image}>
        {loading ? (
          <ClipLoader size={200} color="white" />
        ) : !error ? (
          <>
            <GamePageDetails details={details} openReviewModal={show} />
            <GamePageTrailer details={details} />
          </>
        ) : (
          <GamePageNotFound error={error} />
        )}
      </GamePageHeader>
      <ReviewModal isOpen={open} onClose={hide} />
    </div>
  )
}

export default GamePage
