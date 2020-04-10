import React from 'react'

interface GamePageTrailerProps {
  details?: IGameDetails
}

const GamePageTrailer: React.FC<GamePageTrailerProps> = ({ details }) => {
  return details?.movies?.length ? (
    <div className="w-50 flex items-center justify-center">
      <video className="w-80" controls>
        <source src={details?.movies ? details.movies[0] : ''} />
        Your browser does not support the video tag.
      </video>
    </div>
  ) : null
}

export default GamePageTrailer
