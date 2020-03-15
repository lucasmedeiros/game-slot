import React from 'react'
import { useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useModal from '../../hooks/useModal'
import { Button, GamePageHeader } from '../../styles'
import ReviewModal from '../../components/ReviewModal'

const GamePage: React.FC = () => {
  const { open, hide, show } = useModal()
  const { id } = useParams<GamePageParams>()

  const openOnSteam = () => {
    if (window) {
      window.open(`https://store.steampowered.com/app/${id}/`)
    }
  }

  return (
    <div>
      <GamePageHeader
        backgroundImage={
          'https://steamcdn-a.akamaihd.net/steam/apps/268910/ss_615455299355eaf552c638c7ea5b24a8b46e02dd.1920x1080.jpg?t=1572039891'
        }
      >
        <div className="w-50">
          <h1 className="text-white text-center font-black text-5xl">
            Cuphead
          </h1>
          <p className="text-white font-bold pb-5 text-center">
            Cuphead is a classic run and gun action game heavily focused on boss
            battles. Inspired by cartoons of the 1930s, the visuals and audio
            are painstakingly created with the same techniques of the era, i.e.
            traditional hand drawn cel animation, watercolor backgrounds, and
            original jazz recordings.
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
              className="text-white bg-blue-600 hover:bg-blue-700 py-2 px-3 rounded"
              onClick={show}
            >
              Write a review
            </Button>
            <Button
              className="text-white bg-red-600 hover:bg-red-700 py-2 px-3 ml-2 rounded"
              onClick={openOnSteam}
            >
              View on Steam
            </Button>
          </div>
        </div>
        <div className="w-50 flex items-center justify-center">
          <video className="w-80" controls>
            <source src="http://steamcdn-a.akamaihd.net/steam/apps/256705156/movie_max.webm?t=1515128214" />
            Your browser does not support the video tag.
          </video>
        </div>
      </GamePageHeader>
      <ReviewModal isOpen={open} onClose={hide} />
    </div>
  )
}

export default GamePage
