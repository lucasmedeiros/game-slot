import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '../../styles'
import { arrayUnique } from '../../utils'

interface GamePageDetailsProps {
  details?: IGameDetails
  count?: {
    positive: number
    negative: number
    neutral: number
  }
  openReviewModal: () => void
}

const GamePageDetails: React.FC<GamePageDetailsProps> = ({
  details,
  count,
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
    <div className="flex flex-col items-center" style={{ width: '50vw' }}>
      <h1 className="text-white text-center font-black text-5xl">
        {details?.game.name}
      </h1>
      <p className="text-white w-80 text-center">{details?.description}</p>
      <p className="text-blue-400 py-4 text-center">
        {arrayUnique(details?.developers.concat(details?.publishers)).join(
          ', '
        )}
      </p>
      <div className="flex text-white justify-center items-center py-4">
        <p>
          <FontAwesomeIcon icon="thumbs-up" size="xs" />
        </p>
        <p className="px-3 font-black">{count?.positive}</p>
        <p className="pr-3 font-black">•</p>
        <p>
          <FontAwesomeIcon icon="meh" size="sm" />
        </p>
        <p className="px-3 font-black">{count?.neutral}</p>
        <p className="pr-3 font-black">•</p>
        <p>
          <FontAwesomeIcon icon="thumbs-down" size="1x" />
        </p>
        <p className="px-3 font-black">{count?.negative}</p>
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
