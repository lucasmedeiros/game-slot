import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { Button } from '../../../styles'
import useReviewActions from '../../../hooks/useReviewActions'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import useUserReview from '../../../hooks/useUserReview'

interface IReviewButtons {
  value: RecommendationValue
}

const reviewButtons: IReviewButtons[] = [
  {
    value: 'yes',
  },
  {
    value: 'meh',
  },
  {
    value: 'no',
  },
]

interface ReviewFormProps {
  gameId: string
  updateReviews: (page?: number) => void
}

const ReviewForm: React.FC<ReviewFormProps> = ({ updateReviews, gameId }) => {
  const [recommendation, setRecommendation] = useState<RecommendationValue>()
  const { create, update, submiting } = useReviewActions()
  const [text, setText] = useState<string>()
  const { review, existingReview } = useUserReview(gameId)
  const user = useSelector((state: RootState) => state.userReducer.user)
  const location = useLocation()

  useEffect(() => {
    if (review) {
      setRecommendation(reviewButtons[review.recommended - 1].value)
      setText(review.text)
    }
  }, [review])

  const getIcon = (value: RecommendationValue): IconProp => {
    switch (value) {
      case 'yes':
        return 'thumbs-up'
      case 'meh':
        return 'meh'
      case 'no':
        return 'thumbs-down'
      default:
        return 'thumbs-up'
    }
  }

  const onRecommendationChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: RecommendationValue
  ) => {
    e.preventDefault()
    setRecommendation((prev) => (prev === value ? undefined : value))
  }

  const onRecommendationSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()

    if (!recommendation) {
      alert(
        'Please, select one of the three recommendation options for rating this game'
      )
    } else if (!submiting) {
      try {
        if (!existingReview) {
          await create({
            gameId,
            recommendation,
            text,
          })
        } else {
          await update({
            reviewId: review?._id as string,
            recommendation,
            text,
          })
        }
        updateReviews(1)
      } catch (error) {
        alert(error.message)
      }
    }
  }

  return (
    <section className="text-white h-full py-10 flex flex-col justify-center">
      {user ? (
        <form className="mb-4 rounded w-full md:w-100 flex flex-col">
          <textarea
            placeholder="Write your review..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="resize-none mb-4 shadow-xl appearance-none rounded w-full py-5 px-3 text-gray-600 leading-tight focus:outline-none bg-white text-3xl"
            rows={8}
          />
          <div className="flex items-center justify-around py-4">
            <h2 className="text-2xl text-center">
              Do you recommend this game?
            </h2>
            {reviewButtons.map((rvb, index) => (
              <button
                className={`rounded py-4 px-4 ${
                  recommendation === rvb.value
                    ? 'bg-gray-900'
                    : 'hover:bg-gray-800'
                }`}
                style={{ minWidth: '10vw' }}
                onClick={(e) => onRecommendationChange(e, rvb.value)}
                key={index}
              >
                <FontAwesomeIcon
                  icon={getIcon(rvb.value)}
                  color="#fff"
                  size="2x"
                />
              </button>
            ))}
            <Button
              className={`bg-gray-800 shadow-md hover:bg-gray-900 text-white font-bold py-3 px-4 rounded focus:outline-none text-3xl ${
                submiting ? 'cursor-not-allowed opacity-25' : ''
              }`}
              type="button"
              onClick={onRecommendationSubmit}
            >
              {existingReview ? 'UPDATE' : 'SUBMIT'} REVIEW
            </Button>
          </div>
        </form>
      ) : (
        <div className="w-full flex items-center justify-center text-3xl">
          <p>
            <Link
              to={{ pathname: '/login', state: { from: location.pathname } }}
              className="text-blue-300"
            >
              Sign in
            </Link>{' '}
            to write a review!
          </p>
        </div>
      )}
    </section>
  )
}

export default ReviewForm
