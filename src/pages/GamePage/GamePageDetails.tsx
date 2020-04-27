import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { arrayUnique } from '../../utils'

interface GamePageDetailsProps {
  details?: IGameDetails
  count?: {
    positive: number
    negative: number
    neutral: number
  }
  openModal: () => void
}

const GamePageDetails: React.FC<GamePageDetailsProps> = ({
  details,
  count,
  openModal,
}) => {
  const openOnSteam = () => {
    if (window) {
      window.open(
        `https://store.steampowered.com/app/${details?.game.steamAppId}/`
      )
    }
  }
  return (
    <div className="flex flex-col items-center md:w-1/2">
      <h1 className="text-white text-center px-2 md:p-0 mb-2 font-black text-4xl md:text-5xl">
        {details?.game.name}
      </h1>
      <p className="text-white w-80 px-5 md:p-0 text-center text-2xl">
        {details?.description}
      </p>
      <p className="text-blue-400 py-4 font-bold text-center text-xl">
        {arrayUnique(
          (details?.developers ? details.developers : []).concat(
            details?.publishers ? details.publishers : []
          )
        ).join(', ')}
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
      <div className="flex flex-col md:flex-row p-4 justify-center items-center">
        <button
          className="text-white rounded w-64 bg-blue-600 hover:bg-blue-700 py-4 px-3 md:w-40 lg:w-64"
          onClick={openModal}
        >
          Add to list...
        </button>
        <button
          className="text-white rounded w-64 mt-3 bg-red-600 hover:bg-red-700 py-4 px-3 md:ml-2 md:mt-0 md:w-40 lg:w-64"
          onClick={openOnSteam}
        >
          View on Steam
        </button>
      </div>
    </div>
  )
}

export default GamePageDetails
