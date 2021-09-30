import React from 'react'
import classnames from 'classnames'
import useGameSwiper from '../../hooks/useGameSwiper'
import './Slider.scss'
import { Link } from 'react-router-dom'

interface GameSliderProps {
  children: any
  title: string
  titleUrl: string
}

const GameSlider: React.FC<GameSliderProps> = ({
  children,
  title,
  titleUrl,
}) => {
  const { swiperContainerName, nextElName, prevElName, swiperWrapperName } =
    useGameSwiper()

  const hasContent: boolean = React.Children.count(children) > 0

  return (
    <div
      style={{
        padding: '1rem',
        border: '1px solid #27292c',
        background: '#27292c',
        borderRadius: '4px',
        marginBottom: '1rem',
      }}
    >
      <Link
        to={`${titleUrl}`}
        className={classnames(
          'text-white pl-4 text-xl uppercase font-bold tracking-widest pt-2 hover:underline',
          {
            'cursor-pointer': titleUrl !== null && titleUrl !== undefined,
          }
        )}
      >
        {title}
      </Link>
      {hasContent ? (
        <article className="game-slider px-4">
          <div className={swiperContainerName}>
            <div className={swiperWrapperName}>{children}</div>
            {hasContent && <div className={nextElName} />}
            {hasContent && <div className={prevElName} />}
          </div>
        </article>
      ) : (
        <div style={{ padding: '1rem', color: '#a0aec0' }}>
          This list has no games.
        </div>
      )}
    </div>
  )
}

export default GameSlider
