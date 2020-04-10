import React from 'react'
import { Link } from 'react-router-dom'

interface GamePageNotFoundProps {
  error: string
}

const GamePageNotFound: React.FC<GamePageNotFoundProps> = ({ error }) => {
  return (
    <div>
      <div
        className="flex items-center flex-col justify-center w-full text-gray-400 text-6xl"
        style={{ minHeight: '92vh' }}
      >
        <p className="mt-5">{error}</p>
        <Link to="/" className="text-blue-500 text-4xl">
          Back home
        </Link>
      </div>
    </div>
  )
}

export default GamePageNotFound
