import React from 'react'
import VideoPlayer from '../../components/VideoPlayer'

interface GamePageTrailerProps {
  details?: IGameDetails
}

const GamePageTrailer: React.FC<GamePageTrailerProps> = ({ details }) => {
  return details?.movies?.length ? (
    <div
      className="flex items-center justify-center text-center p-3"
      style={{ width: '50vw' }}
    >
      <VideoPlayer
        url={details?.movies ? details.movies[0] : ''}
        width={90}
        height={90}
      />
    </div>
  ) : null
}

export default GamePageTrailer
