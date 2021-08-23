import React, { Fragment } from 'react'
import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useGameSwiper from '../../hooks/useGameSwiper'
import './Slider.scss'
import { useHistory } from 'react-router-dom'

const EMPTY_BOX_SIZE = '8rem'

interface GameSliderProps {
  title: string
  titleUrl?: string
}

const GameSlider: React.FC<GameSliderProps> = ({
  children,
  title,
  titleUrl,
}) => {
  const { swiperContainerName, nextElName, prevElName, swiperWrapperName } =
    useGameSwiper()

  const history = useHistory()

  const hasContent: boolean = React.Children.count(children) > 0
  const goToSearchPage = () => {
    history.push('/search')
  }
  const goToListPage = () => {
    if (titleUrl) history.push(titleUrl)
  }

  return (
    <Fragment>
      <h1
        onClick={goToListPage}
        className={classnames(
          'text-white pl-4 text-xl uppercase font-bold tracking-widest pt-2',
          {
            'cursor-pointer': titleUrl !== null && titleUrl !== undefined,
          }
        )}
      >
        {title}
      </h1>
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
          {hasContent && <div className={nextElName} />}
          {hasContent && <div className={prevElName} />}
        </div>
      </article>
    </Fragment>
  )
}

export default GameSlider
