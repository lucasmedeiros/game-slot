import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ClipLoader } from 'react-spinners'
import useModal from '../../hooks/useModal'
import { Button, GamePageHeader } from '../../styles'
import ReviewModal from '../../components/ReviewModal'
import useGameDetails from '../../hooks/useGameDetails'
import { getRandomItemFromArray, preLoadImage } from '../../utils'

const GamePage: React.FC = () => {
  const { open, hide, show } = useModal()
  const { id } = useParams<GamePageParams>()
  const { details, loading } = useGameDetails(id)
  const [image, setImage] = useState<string>()

  const openOnSteam = () => {
    if (window) {
      window.open(`https://store.steampowered.com/app/${id}/`)
    }
  }

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
        ) : (
          <>
            <div className="w-50 flex flex-col items-center">
              <h1 className="text-white text-center font-black text-5xl">
                {details?.game.name}
              </h1>
              <p className="text-white w-80 pb-5 text-center">
                {details?.description}
              </p>
              <div className="flex text-white justify-center items-center py-4">
                <p>
                  <FontAwesomeIcon icon="thumbs-up" size="xs" />
                </p>
                <p className="px-3 font-black">20</p>
                <p className="pr-3 font-black">•</p>
                <p>
                  <FontAwesomeIcon icon="thumbs-down" size="1x" />
                </p>
                <p className="px-3 font-black">2</p>
              </div>
              <div className="flex p-4 justify-center items-center">
                <Button
                  className="text-white bg-blue-600 hover:bg-blue-700 py-4 px-3 rounded"
                  onClick={show}
                >
                  Write a review
                </Button>
                <Button
                  className="text-white bg-red-600 hover:bg-red-700 py-4 px-3 ml-2 rounded"
                  onClick={openOnSteam}
                >
                  View on Steam
                </Button>
              </div>
            </div>
            {details?.movies?.length && (
              <div className="w-50 flex items-center justify-center">
                <video className="w-80" controls>
                  <source src={details?.movies ? details.movies[0] : ''} />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </>
        )}
      </GamePageHeader>
      <ReviewModal isOpen={open} onClose={hide} />
    </div>
  )
}

export default GamePage
