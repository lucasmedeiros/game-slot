import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '../../styles'

interface GamePageDetailsProps {
  details?: IGameDetails
  openReviewModal: () => void
}

const GamePageDetails: React.FC<GamePageDetailsProps> = ({
  details,
  openReviewModal,
}) => {
  const openOnSteam = () => {
    if (window) {
      window.open(
        `https://store.steampowered.com/app/${details?.game.steamAppId}/`
      )
    }
  }
  return (
    <div className="w-50 flex flex-col items-center">
      <h1 className="text-white text-center font-black text-5xl">
        {details?.game.name}
      </h1>
      <p className="text-white w-80 pb-5 text-center">{details?.description}</p>
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
          onClick={openReviewModal}
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
  )
}

export default GamePageDetails
