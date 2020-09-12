import React from 'react'
import { useHistory } from 'react-router-dom'
import './SliderItem.scss'

interface GameSliderItemProps {
  game: IGame
}

const SliderItem: React.FC<GameSliderItemProps> = ({ game }) => {
  const history = useHistory()
  const goToGamePage = (id: string) => history.push(`game/${id}`)
  return (
    <div
      className="swiper-slide cursor-pointer"
      onClick={() => goToGamePage(game.steamAppId)}
    >
      <img
        className="w-full h-auto"
        src={game.imageUrl}
        alt={`${game.name} steam header`}
      />
    </div>
  )
}

export default SliderItem
