import React from 'react'
import { IGameReview } from '../../../hooks/useGameReviews'
import AvatarPlaceholder from '../../../assets/img/avatar.png'
import BreakLine from '../../../components/BreakLine'
import Star from '../../../icons/Star'
import Radium from 'radium'

const TOTAL_STARS_REVIEWS = 5

interface GameReviewProps {
  review: IGameReview
  showLineBreak?: boolean
}

const GameReview: React.FC<GameReviewProps> = ({
  review,
  showLineBreak = true,
}) => {
  const { note, text, user, createdAt } = review
  return (
    <article className="py-4">
      <div className="flex flex-col md:flex-row items-center py-5">
        <div className="flex items-center mb-4 md:mb-0">
          <div
            className="mr-2 md:mr-5 rounded-full overflow-hidden text-white"
            style={{ width: '3rem', height: '3rem' }}
          >
            <button>
              <img src={AvatarPlaceholder} alt="User" />
            </button>
          </div>
          <p className="font-bold text-lg">{user.name} </p>
          <p className="md:pl-2 text-xs md:text-base text-gray-500">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
        <div style={{ display: 'flex', marginLeft: '16px' }}>
          {[...Array(TOTAL_STARS_REVIEWS)].map((_, index) => (
            <div key={`star-review-${index}`}>
              <Star filled={index + 1 <= note} size={30} />
            </div>
          ))}
        </div>
      </div>
      {text ? (
        <div className="flex items-start justify-start rounded text-xl px-8 pb-8 text-white mb-4">
          {text}
        </div>
      ) : null}
      {showLineBreak && <BreakLine />}
    </article>
  )
}

export default Radium(GameReview)
