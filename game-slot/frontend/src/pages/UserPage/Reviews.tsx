import React, { useEffect, useState } from 'react'
import { callAPI } from '../../services/request.service'
import More from './More'
import Star from '../../icons/Star'
import { IGameReview } from '../../hooks/useGameReviews'

const DEFAULT_LENGTH = 3
const TOTAL_STARS_REVIEWS = 5

function ReviewItem({ gameId, text, note }: IGameReview) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '10px 30px 10px 0',
        justifyContent: 'start',
        alignItems: 'center',
        textAlign: 'center',
        width: '300px',
      }}
    >
      <img
        src={`https://steamcdn-a.akamaihd.net/steam/apps/${gameId}/header.jpg`}
        alt={`Review for game ${gameId}`}
        style={{
          width: '250px',
          height: '160px',
          marginBottom: '10px',
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          padding: '0px 15px',
        }}
      >
        {[...Array(TOTAL_STARS_REVIEWS)].map((_, index) => (
          <div key={`star-review-${index}`}>
            <Star filled={index + 1 <= note} size={40} />
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: '10px',
          overflow: 'hidden',
          wordBreak: 'break-word',
          maxHeight: '60px',
          lineHeight: '20px',
          lineClamp: 3,
          display: 'block',
        }}
      >
        <p style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</p>
      </div>
    </div>
  )
}

interface ReviewsProps {
  nickname: string
  id: string
}

const Reviews = ({ nickname, id: userId }: ReviewsProps) => {
  const [reviews, setReviews] = useState<IGameReview[] | undefined>()

  useEffect(() => {
    const getUserReviews = async () => {
      const { data } = await callAPI(`review/user/${userId}`, 'GET', null)
      setReviews(data)
    }

    getUserReviews()
  }, [userId])

  return (
    <div
      style={{
        display: 'flex',
        marginTop: '30px',
        marginBottom: '30px',
      }}
    >
      {reviews?.length ? (
        <>
          {reviews.slice(0, DEFAULT_LENGTH).map((review) => (
            <ReviewItem {...review} key={review._id} />
          ))}
          {reviews.length > 3 && <More type="reviews" nickname={nickname} />}
        </>
      ) : (
        <div>No reviews to show</div>
      )}
    </div>
  )
}

export default Reviews
