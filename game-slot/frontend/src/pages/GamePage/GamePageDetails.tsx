import React from 'react'
import classnames from 'classnames'
import { arrayUnique } from '../../utils'
import { useCurrentUser } from '../../contexts/UserContext'
import { useHistory } from 'react-router'
import Star from '../../icons/Star'

interface GamePageDetailsProps {
  details: IGameDetails
  rating: number
}

const GamePageDetails: React.FC<GamePageDetailsProps> = (props) => {
  const { details, rating } = props
  const { user } = useCurrentUser()
  const history = useHistory()
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
        {details.game.name}
      </h1>
      <p className="text-white w-80 px-5 md:p-0 text-center text-xl">
        {details.description}
      </p>
      <p className="text-blue-400 py-4 font-bold text-center text-xl">
        {arrayUnique(
          (details.developers ? details.developers : []).concat(
            details.publishers ? details.publishers : []
          )
        ).join(', ')}
      </p>
      <div className="flex flex-row items-center">
        <Star size={28} />
        <span className="font-bold text-xl text-blue-100 px-2">
          {rating === -1 ? '-' : rating}
        </span>
      </div>
      <div className="flex flex-col md:flex-row p-4 justify-center items-center">
        <button
          className={classnames(
            'text-white rounded w-64 bg-blue-700 py-4 px-3 md:w-40 lg:w-64',
            {
              'hidden ': !user,
            }
          )}
          onClick={() => history.push(`${history.location.pathname}/add`)}
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
