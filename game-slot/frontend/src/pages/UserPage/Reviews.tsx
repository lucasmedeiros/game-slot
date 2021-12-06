import React, { useEffect, useState } from 'react'
import Radium from 'radium'
import { useHistory } from 'react-router-dom'
import { callAPI } from '../../services/request.service'
import More from './More'
import Star from '../../icons/Star'
import { IGameReview } from '../../hooks/useGameReviews'
import devices from '../../styles/devices'

const DEFAULT_LENGTH = 3
const TOTAL_STARS_REVIEWS = 5

const ReviewItem = Radium(function ({ gameId, text, note }: IGameReview) {
  const history = useHistory()
  const goToGamePage = (id: string) => {
    history.push(`/game/${id}`)
  }
  return (
    <div
      style={
        {
          display: 'flex',
          padding: '10px 0px',
          flexWrap: 'wrap',
          justifyContent: 'start',
          alignItems: 'center',
          textAlign: 'center',
          width: '300px',
          [`@media ${devices.tablet}`]: {
            padding: '0 30px 10px 0',
            alignItems: 'start',
            flexDirection: 'row',
          },
        } as Radium.StyleProps['rules']
      }
    >
      <img
        src={`https://steamcdn-a.akamaihd.net/steam/apps/${gameId}/header.jpg`}
        alt={`Review for game ${gameId}`}
        onClick={() => goToGamePage(gameId)}
        style={{
          width: '100%',
          height: '160px',
          marginBottom: '10px',
          cursor: 'pointer',
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
})

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
        flexDirection: 'column',
        marginTop: '30px',
        marginBottom: '30px',
        width: '100%',
        alignItems: 'center',
        flexWrap: 'wrap',
        [`@media ${devices.tablet}`]: {
          alignItems: 'start',
          flexDirection: 'row',
        },
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

export default Radium(Reviews)
