import React from 'react'
import classnames from 'classnames'
import { arrayUnique } from '../../utils'
import { useCurrentUser } from '../../contexts/UserContext'

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
  openModal,
}) => {
  const { user } = useCurrentUser()
  const openOnSteam = () => {
    if (window) {
      window.open(
        `https://store.steampowered.com/app/${details?.game.steamAppId}/`
      )
    }
  }
  return (
    <div className="flex flex-col items-center md:w-1/2">
      <h1 className="text-white text-center px-2 md:p-0 mb-2 font-black text-2xl md:text-5xl">
        {details?.game.name}
      </h1>
      <p className="text-white w-80 px-5 md:p-0 text-center text-xl">
        {details?.description}
      </p>
      <p className="text-blue-400 py-4 font-bold text-center text-xl">
        {arrayUnique(
          (details?.developers ? details.developers : []).concat(
            details?.publishers ? details.publishers : []
          )
        ).join(', ')}
      </p>
      <div className="flex flex-col md:flex-row p-4 justify-center items-center">
        <button
          className={classnames(
            'text-white rounded w-64 bg-blue-700 py-4 px-3 md:w-40 lg:w-64',
            {
              'hidden ': !user,
            }
          )}
          onClick={openModal}
        >
          Add to list...
        </button>
        <button
          className="text-white rounded w-64 mt-3 bg-red-600 py-4 px-3 md:ml-2 md:mt-0 md:w-40 lg:w-64"
          onClick={openOnSteam}
        >
          View on Steam
        </button>
      </div>
    </div>
  )
}

export default GamePageDetails
