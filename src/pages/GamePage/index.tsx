import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { ClipLoader } from 'react-spinners'
import { GamePageHeader } from '../../styles'
import { getRandomItemFromArray, preLoadImage } from '../../utils'
import GamePageDetails from './GamePageDetails'
import GamePageNotFound from './GamePageNotFound'
import GamePageTrailer from './GamePageTrailer'
import ReviewModal from '../../components/ReviewModal'
import useModal from '../../hooks/useModal'
import useGameDetails from '../../hooks/useGameDetails'
import useGameReviews from '../../hooks/useGameReviews'

interface GamePageParams {
  id: string
}

const GamePage: React.FC = () => {
  const { open, hide, show } = useModal()
  const { id } = useParams<GamePageParams>()
  const { details, loading: loadingDetails, error } = useGameDetails(id)
  const { result } = useGameReviews(id)
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
    <section>
      <GamePageHeader backgroundImage={image}>
        {loadingDetails ? (
          <ClipLoader size={200} color="white" />
        ) : !error ? (
          <>
            <GamePageDetails
              details={details}
              count={result?.count}
              openReviewModal={show}
            />
            <GamePageTrailer details={details} />
          </>
        ) : (
          <GamePageNotFound error={error} />
        )}
      </GamePageHeader>
      <ReviewModal isOpen={open} onClose={hide} />
    </section>
  )
}

export default GamePage
