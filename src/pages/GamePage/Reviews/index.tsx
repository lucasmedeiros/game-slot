import React from 'react'
import { IGameReviewsDetails } from '../../../hooks/useGameReviews'
import GameReview from './GameReview'
import Pagination from '../../../components/Pagination'

interface ReviewsProps {
  reviewsResult?: IGameReviewsDetails
  loading: boolean
  update: (page?: number, limit?: number) => void
}

const Reviews: React.FC<ReviewsProps> = ({
  reviewsResult,
  loading,
  update,
}) => {
  return (
    <article className="w-full p-5">
      <div className="bg-gray-700 text-white p-5 w-full h-full rounded">
        <h1 className="text-5xl font-bold">Reviews</h1>
        <div className="px-20 py-5">
          {loading ? null : reviewsResult?.reviews.docs.length ? (
            <Pagination result={reviewsResult.reviews} refresh={update}>
              {reviewsResult.reviews.docs.map((review) => (
                <GameReview key={`${review._id}`} review={review} />
              ))}
            </Pagination>
          ) : (
            <p className="text-xl m-4">
              This game doesn't have any reviews at this moment
            </p>
          )}
        </div>
      </div>
    </article>
  )
}

export default Reviews
