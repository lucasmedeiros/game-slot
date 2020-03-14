import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Content.scss'

const Content = ({ game, onClose }: { game: IGame; onClose: () => void }) => {
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
          <div className="content__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque et euismod ligula. Morbi mattis pretium eros, ut mollis
            leo tempus eget. Sed in dui ac ipsum feugiat ultricies. Phasellus
            vestibulum enim quis quam congue, non fringilla orci placerat.
            Praesent sollicitudin
          </div>
        </div>
        <button className="content__close" onClick={onClose}>
          <FontAwesomeIcon icon="times" color="white" size="2x" />
        </button>
      </div>
    </div>
  )
}

export default Content
