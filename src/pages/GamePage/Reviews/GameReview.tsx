import React from 'react'
import { IGameReview } from '../../../hooks/useGameReviews'
import AvatarPlaceholder from '../../../assets/img/avatar.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface GameReviewProps {
  review: IGameReview
}

const getRecommendationValue = (value: number): { icon: IconProp } => {
  switch (value) {
    case 1:
      return {
        icon: 'thumbs-up',
      }
    case 2:
      return {
        icon: 'thumbs-down',
      }
    case 3:
      return {
        icon: 'meh',
      }
    default:
      return {
        icon: 'thumbs-up',
      }
  }
}

const GameReview: React.FC<GameReviewProps> = ({ review }) => {
  const { recommended, text, userId } = review
  const recomendationValue = getRecommendationValue(recommended)
  return (
    <article className="py-4">
      <div className="flex items-center p-2">
        <div
          className="mr-5 rounded-full overflow-hidden text-white"
          style={{ width: '2.5rem', height: '2.5rem' }}
        >
          <button>
            <img src={AvatarPlaceholder} alt="User" />
          </button>
        </div>
        <p className="font-bold">{userId}:</p>
      </div>
      <div className="flex bg-white rounded p-3 text-gray-800">
        <p className="mr-5 text-gray-400">
          <FontAwesomeIcon
            icon={recomendationValue.icon}
            size="2x"
          ></FontAwesomeIcon>
        </p>
        {text}
      </div>
    </article>
  )
}

export default GameReview
