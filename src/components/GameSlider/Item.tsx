import React, { useContext } from 'react'
import cx from 'classnames'
import SliderContext from './context'
import ShowDetailsButton from './ShowDetailsButton'
import Mark from './Mark'
import './Item.scss'

const Item = ({ game }: { game: IGame }) => {
  const { currentSlide, elementRef, onSelectSlide } = useContext(SliderContext)

  const isActive = currentSlide && currentSlide.steamAppId === game.steamAppId

  return (
    <div
      ref={elementRef}
      className={cx('item', {
        'item--open': isActive,
      })}
    >
      <img src={game.imageUrl} alt="" />
      <ShowDetailsButton onClick={() => onSelectSlide(game)} />
      {isActive && <Mark />}
    </div>
  )
}

export default Item
