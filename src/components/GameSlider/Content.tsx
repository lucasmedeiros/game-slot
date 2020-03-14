import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Content.scss'
import { Button } from '../../styles'
import { useHistory } from 'react-router'

const Content = ({ game, onClose }: { game: IGame; onClose: () => void }) => {
  const history = useHistory()

  const goToGamePage = (id: string) => history.push(`game/${id}`)

  return (
    <div className="content">
      <div className="content__background">
        <div className="content__background__shadow" />
        <div
          className="content__background__image"
          style={{ backgroundImage: `url(${game.imageUrl})` }}
        />
      </div>
      <div className="content__area">
        <div className="content__area__container">
          <div className="content__title">{game.name}</div>
          <div className="content__info">
            <p>
              Forge your own path in Hollow Knight! An epic action adventure
              through a vast ruined kingdom of insects and heroes. Explore
              twisting caverns, battle tainted creatures and befriend bizarre
              bugs, all in a classic, hand-drawn 2D style.
            </p>
            <p className="text-blue-400 py-4">Team Cherry</p>
            <div className="flex text-white items-center py-4">
              <p>
                <FontAwesomeIcon icon="thumbs-up" size="xs" />
              </p>
              <p className="px-3">10</p>
              <p className="pr-3">•</p>
              <p>
                <FontAwesomeIcon icon="thumbs-down" size="xs" />
              </p>
              <p className="px-3">2</p>
            </div>
          </div>
          <Button
            className="bg-blue-700 shadow-md hover:bg-blue-500 text-white font-bold py-3 px-4 mt-3 rounded focus:outline-none"
            type="button"
            onClick={() => goToGamePage(game.steamAppId)}
          >
            VIEW
          </Button>
        </div>
        <button className="content__close" onClick={onClose}>
          <FontAwesomeIcon icon="times" color="white" size="2x" />
        </button>
      </div>
    </div>
  )
}

export default Content
