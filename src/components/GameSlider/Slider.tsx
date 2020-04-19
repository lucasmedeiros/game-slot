import React, { useState } from 'react'
import cx from 'classnames'
import SliderContext from './context'
import Content from './Content'
import SlideButton from './SlideButton'
import SliderWrapper from './SliderWrapper'
import useSliding from './useSliding'
import useSizeElement from './useSizeElement'
import './Slider.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const EMPTY_BOX_SIZE: string = '8rem'

interface IGameSlideProps {
  activeSlide?: IGame | null
  sectionTitle: string
}

const Slider: React.FC<IGameSlideProps> = ({
  children,
  activeSlide,
  sectionTitle,
}) => {
  const [currentSlide, setCurrentSlide] = useState(activeSlide)
  const { width, elementRef } = useSizeElement()
  const {
    handlePrev,
    handleNext,
    slideProps,
    containerRef,
    hasNext,
    hasPrev,
  } = useSliding(width, React.Children.count(children))

  const handleSelect = (game: IGame) => {
    setCurrentSlide(game)
  }

  const handleClose = () => {
    setCurrentSlide(null)
  }

  const contextValue: SliderContextType = {
    onSelectSlide: handleSelect,
    elementRef,
    currentSlide: currentSlide as IGame,
  }

  return (
    <SliderContext.Provider value={contextValue}>
      <SliderWrapper>
        <h2 className="pb-3 ml-8" style={{ color: '#11151c' }}>
          {sectionTitle} >
        </h2>
        <div className={cx('slider', { 'slider--open': currentSlide != null })}>
          <div ref={containerRef} className="slider__container" {...slideProps}>
            {React.Children.count(children) ? (
              children
            ) : (
              <div
                className="flex items-center justify-center text-center bg-gray-300 text-gray-500 text-lg"
                style={{
                  width: EMPTY_BOX_SIZE,
                  height: EMPTY_BOX_SIZE,
                  cursor: 'pointer',
                }}
              >
                <FontAwesomeIcon icon="plus-circle" size="3x" color="#a0aec0" />
              </div>
            )}
          </div>
        </div>
        {hasPrev && <SlideButton onClick={handlePrev} type="prev" />}
        {hasNext && <SlideButton onClick={handleNext} type="next" />}
      </SliderWrapper>
      {currentSlide && <Content game={currentSlide} onClose={handleClose} />}
    </SliderContext.Provider>
  )
}

export default Slider
