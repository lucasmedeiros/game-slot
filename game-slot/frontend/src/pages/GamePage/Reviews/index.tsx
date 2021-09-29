import React from 'react'
import { IGameReviewsDetails } from '../../../hooks/useGameReviews'
import GameReview from '../../../components/GameReview'
import Pagination from '../../../components/Pagination'
import ReviewForm from './ReviewForm'
import BreakLine from '../../../components/BreakLine'

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
    <article className="w-full px-2 py-2 md:px-20">
      <div className="text-white p-5 w-full h-full">
        <div className="bg-dark-700 rounded-lg">
          <h1 className="text-3xl font-bold p-5">Reviews</h1>
          <BreakLine />
          <ReviewForm gameId={gameId} updateReviews={update} />
          <BreakLine />
          {reviewsResult?.reviews.docs.length ? (
            <div className="py-2 px-1 md:py-5 md:px-20">
              <Pagination
                result={reviewsResult.reviews}
                loading={loading}
                refresh={update}
              >
                {reviewsResult.reviews.docs.map((review) => (
                  <GameReview key={`${review._id}`} review={review} />
                ))}
              </Pagination>
            </div>
          ) : (
            <p className="p-5 rounded text-2xl text-gray-200">
              This game doesn&apos;t have any reviews at this moment...
            </p>
          )}
        </div>
      </div>
    </article>
  )
}

export default Reviews
