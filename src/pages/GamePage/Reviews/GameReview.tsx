import React from 'react'
import { IGameReview } from '../../../hooks/useGameReviews'
import AvatarPlaceholder from '../../../assets/img/avatar.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  RECOMMENDED_YES,
  RECOMMENDED_NO,
  RECOMMENDED_MEH,
} from '../../../constants'

interface GameReviewProps {
  review: IGameReview
}

const getRecommendationValue = (
  value: number
): { icon: IconProp; title: string; bgClassName: string } => {
  switch (value) {
    case RECOMMENDED_YES:
      return {
        icon: 'thumbs-up',
        title: 'Recommended',
        bgClassName: 'bg-blue-900',
      }
    case RECOMMENDED_NO:
      return {
        icon: 'thumbs-down',
        title: 'Not Recommended',
        bgClassName: 'bg-red-900',
      }
    case RECOMMENDED_MEH:
      return {
        icon: 'meh',
        title: 'Partially Recommended',
        bgClassName: 'bg-yellow-600',
      }
    default:
      return {
        icon: 'thumbs-up',
        title: 'Recommended',
        bgClassName: 'bg-blue-900',
      }
  }
}

const GameReview: React.FC<GameReviewProps> = ({ review }) => {
  const { recommended, text, user, createdAt } = review
  const recomendationValue = getRecommendationValue(recommended)
  return (
    <article className="py-4">
      <div className="flex items-center py-5">
        <div
          className="mr-5 rounded-full overflow-hidden text-white"
          style={{ width: '3rem', height: '3rem' }}
        >
          <button>
            <img src={AvatarPlaceholder} alt="User" />
          </button>
        </div>
        <p className="font-bold text-lg">{user.name} </p>
        <p className="pl-2 text-gray-500">
          {new Date(createdAt).toLocaleDateString()}
        </p>
        <div
          className={`ml-3 flex text-white rounded p-4 items-center ${recomendationValue.bgClassName}`}
        >
          <p className="mr-5">
            <FontAwesomeIcon icon={recomendationValue.icon} size="2x" />
          </p>
          <p>{recomendationValue.title}</p>
        </div>
      </div>
      {text ? (
        <div className="flex bg-white items-start justify-start rounded text-xl px-8 py-4 text-gray-800 mb-4">
          {text}
        </div>
      ) : null}
    </article>
  )
}

export default GameReview
