import React, { useState } from 'react'
import cx from 'classnames'
import SliderContext from './context'
import Content from './Content'
import SlideButton from './SlideButton'
import SliderWrapper from './SliderWrapper'
import useSliding from './useSliding'
import useSizeElement from './useSizeElement'
import './Slider.scss'

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
            {children}
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
