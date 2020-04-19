import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useGameSwiper from '../../hooks/useGameSwiper'
import './Slider.scss'

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

  const hasContent: boolean = React.Children.count(children) > 0

  return (
    <>
      <h1 className="text-white ml-4">{title}</h1>
      <section className="game-slider px-4">
        <div className={swiperContainerName}>
          <div className={swiperWrapperName}>
            {hasContent ? (
              children
            ) : (
              <div
                className="flex items-center ml-8 justify-center text-center bg-gray-700 rounded text-gray-500 text-lg"
                style={{
                  width: EMPTY_BOX_SIZE,
                  height: EMPTY_BOX_SIZE,
                  cursor: 'pointer',
                }}
              >
                <FontAwesomeIcon icon="plus-circle" size="3x" color="#fff" />
              </div>
            )}
          </div>
          {hasContent && <div className={nextElName}></div>}
          {hasContent && <div className={prevElName}></div>}
        </div>
      </section>
    </>
  )
}

export default GameSlider
