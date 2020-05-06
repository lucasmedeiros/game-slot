import React from 'react'
import { IGameReviewsDetails } from '../../../hooks/useGameReviews'
import GameReview from './GameReview'
import Pagination from '../../../components/Pagination'
import ReviewForm from './ReviewForm'

interface ReviewsProps {
  reviewsResult?: IGameReviewsDetails
  loading: boolean
  gameId: string
  update: (page?: number, limit?: number) => void
}

const Reviews: React.FC<ReviewsProps> = ({
  reviewsResult,
  loading,
  update,
  gameId,
}) => {
  return (
    <article className="w-full p-5">
      <div className="text-white p-5 w-full h-full rounded">
        <h1 className="text-5xl font-bold">Reviews</h1>
        <div className="md:py-5 md:px-20">
          <ReviewForm gameId={gameId} updateReviews={update} />
          <div className="border border-gray-600" />
          {reviewsResult?.reviews.docs.length ? (
            <Pagination
              result={reviewsResult.reviews}
              loading={loading}
              refresh={update}
            >
              {reviewsResult.reviews.docs.map((review) => (
                <GameReview key={`${review._id}`} review={review} />
              ))}
            </Pagination>
          ) : (
            <p className="p-5 bg-gray-900 rounded text-2xl m-4 text-gray-500">
              This game doesn't have any reviews at this moment...
            </p>
          )}
        </div>
      </div>
    </article>
  )
}

export default Reviews
