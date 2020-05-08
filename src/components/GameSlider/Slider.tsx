import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useGameSwiper from '../../hooks/useGameSwiper'
import './Slider.scss'
import { useHistory } from 'react-router-dom'

const EMPTY_BOX_SIZE: string = '8rem'

interface GameSliderProps {
  title: string
}

const GameSlider: React.FC<GameSliderProps> = ({ children, title }) => {
  const {
    swiperContainerName,
    nextElName,
    prevElName,
    swiperWrapperName,
  } = useGameSwiper()

  const history = useHistory()

  const hasContent: boolean = React.Children.count(children) > 0
  const goToSearchPage = () => {
    history.push('/search')
  }

  return (
    <>
      <h1 className="text-white ml-4 text-2xl pt-2">{title}</h1>
      <article className="game-slider px-4">
        <div className={swiperContainerName}>
          <div className={swiperWrapperName}>
            {hasContent ? (
              children
            ) : (
              <button
                className="flex items-center ml-8 justify-center text-center bg-gray-700 rounded text-gray-500 text-lg"
                style={{
                  width: EMPTY_BOX_SIZE,
                  height: EMPTY_BOX_SIZE,
                  cursor: 'pointer',
                }}
                onClick={goToSearchPage}
              >
                <FontAwesomeIcon icon="plus-circle" size="3x" color="#fff" />
              </button>
            )}
          </div>
          {hasContent && <div className={nextElName}></div>}
          {hasContent && <div className={prevElName}></div>}
        </div>
      </article>
    </>
  )
}

export default GameSlider
