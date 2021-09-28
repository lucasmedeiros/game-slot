import React, { useState } from 'react'
import { IGameReview } from '../hooks/useGameReviews'
import AvatarPlaceholder from '../assets/img/avatar.png'
import Star from '../icons/Star'
import Radium from 'radium'
import Like from '../icons/Like'
import { useHistory } from 'react-router'
import { useCurrentUser } from '../contexts/UserContext'
import useReviewActions from '../hooks/useReviewActions'

const TOTAL_STARS_REVIEWS = 5

interface GameReviewProps {
  review: IGameReview
}

const GameReview = ({ review }: GameReviewProps) => {
  const {
    note,
    text,
    user: userReview,
    createdAt,
    likes,
    _id: reviewId,
  } = review
  const history = useHistory()
  const currentUser = useCurrentUser()
  const { like, dislike } = useReviewActions()

  const [liked, setLiked] = useState(
    !!likes.find((likes) => likes === currentUser.user?._id)
  )

  const [likesCount, setLikesCount] = useState(likes.length)

  return (
    <div style={{ paddingBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            width: '3rem',
            height: '3rem',
            cursor: 'pointer',
          }}
          onClick={() => history.push(`/user/${userReview.nickname}`)}
        >
          <img
            style={{ borderRadius: '50%' }}
            src={userReview.picture ?? AvatarPlaceholder}
            alt="User"
          />
        </div>
        <p
          style={{ paddingLeft: '1rem', paddingRight: '1rem', color: 'white' }}
        >
          {userReview.name}{' '}
        </p>
        <p style={{ color: '#A0AEC0' }}>
          {new Date(createdAt).toLocaleDateString()}
        </p>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              paddingLeft: '1rem',
              paddingRight: '1rem',
            }}
          >
            {[...Array(TOTAL_STARS_REVIEWS)].map((_, index) => (
              <div key={`star-review-${index}`}>
                <Star filled={index + 1 <= note} size={24} />
              </div>
            ))}
          </div>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: '0.375rem',
              paddingRight: '0.375rem',
              backgroundColor: liked ? '#A0AEC0' : '#36383B',
              border: liked ? 'none' : '1px solid #A0AEC0',
              width: '3rem',
              height: '1.5rem',
              borderRadius: '0.25rem',
              cursor: currentUser.user ? 'pointer' : 'auto',
            }}
            disabled={!currentUser.user}
            onClick={async () => {
              setLiked(!liked)
              setLikesCount(liked ? likesCount - 1 : likesCount + 1)
              liked ? await dislike({ reviewId }) : await like({ reviewId })
            }}
          >
            <Like filled={liked} size={16} />
            <p
              style={{
                fontSize: 12,
                color: liked ? '#36383B' : '#A0AEC0',
              }}
            >
              {likesCount}
            </p>
          </button>
        </div>
      </div>
      {text ? (
        <div style={{ paddingTop: '1.5rem', color: 'white' }}>{text}</div>
      ) : null}
    </div>
  )
}

export default Radium(GameReview)
