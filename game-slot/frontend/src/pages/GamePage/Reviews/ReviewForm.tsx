/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import useReviewActions from '../../../hooks/useReviewActions'
import useUserReview from '../../../hooks/useUserReview'
import { useAuth0 } from '@auth0/auth0-react'
import { useCurrentUser } from '../../../contexts/UserContext'
import Star from '../../../icons/Star'

const TOTAL_STARS_REVIEWS = 5

interface ReviewFormProps {
  gameId: string
  updateReviews: (page?: number) => void
}

const ReviewForm: React.FC<ReviewFormProps> = ({ updateReviews, gameId }) => {
  const [recommendation, setRecommendation] = useState<number>()
  const {
    create,
    update: updateReview,
    submiting,
    remove: deleteReview,
  } = useReviewActions()
  const [text, setText] = useState<string>('')
  const { user } = useCurrentUser()
  const {
    review,
    existingReview,
    update: updateUserReview,
  } = useUserReview(gameId, user, [user])
  const { isAuthenticated, loginWithPopup } = useAuth0()

  useEffect(() => {
    if (review) {
      setRecommendation(review.note)
      setText(review.text)
    }
  }, [review])

  const onRecommendationChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: number
  ) => {
    e.preventDefault()
    setRecommendation(value)
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
            note: recommendation,
            text: text ?? '',
          })
        } else {
          await updateReview({
            reviewId: review?._id as string,
            note: recommendation,
            text: text ?? '',
          })
        }
        updateReviews(1)
        updateUserReview()
      } catch (error: any) {
        alert(error.message)
      }
    }
  }

  const onDeleteReview = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    try {
      if (existingReview) {
        if (confirm('Are you sure you want to delete your review?')) {
          await deleteReview({
            reviewId: review?._id as string,
          })
          updateReviews(1)
          updateUserReview()
          setText('')
          setRecommendation(undefined)
        }
      }
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <section className="text-white h-full flex flex-col justify-center">
      {isAuthenticated ? (
        <form className="mb-4 md:py-5 md:px-20 rounded w-full md:w-100 flex flex-col">
          <textarea
            placeholder="Write your review..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="resize-none mb-4 shadow-xl appearance-none rounded-lg w-full py-5 px-3 text-gray-400 leading-tight focus:outline-none bg-dark-600 text-xl md:text-xl border border-dark-500"
            rows={8}
          />
          <div className="flex flex-col xl:flex-row items-center justify-around py-4">
            <div className="flex items-center my-3 lg:my-0">
              <span style={{ marginRight: '10px', fontSize: '2rem' }}>
                Rating:
              </span>
              {[...Array(TOTAL_STARS_REVIEWS)].map((_, index) => (
                <button
                  key={`star-review-${index}`}
                  onClick={(e) => onRecommendationChange(e, index + 1)}
                  style={{ outline: 'none' }}
                >
                  <Star filled={index + 1 <= (recommendation ?? 0)} />
                </button>
              ))}
            </div>
            <div className="flex flex-col w-full lg:mt-4 xl:mt-0 md:w-auto md:flex-row">
              <button
                className={classnames(
                  'w-full md:w-auto bg-blue-900 shadow-lg hover:bg-blue-800 text-white font-bold py-3 px-4 rounded focus:outline-none text-xl md:text-xl',
                  {
                    'cursor-not-allowed opacity-25': submiting,
                  }
                )}
                type="button"
                onClick={onRecommendationSubmit}
              >
                {existingReview ? 'UPDATE' : 'SUBMIT'} REVIEW
              </button>
              {existingReview && (
                <button
                  className="w-full md:w-auto mt-3 md:mt-0 md:ml-3 bg-red-700 shadow-md hover:bg-red-600 text-white font-bold py-3 px-4 rounded focus:outline-none text-xl md:text-xl"
                  type="button"
                  onClick={onDeleteReview}
                >
                  DELETE REVIEW
                </button>
              )}
            </div>
          </div>
        </form>
      ) : (
        <div className="w-full p-5 flex text-2xl">
          <p>
            <button onClick={() => loginWithPopup()} className="text-red-400">
              Sign in
            </button>{' '}
            to write a review!
          </p>
        </div>
      )}
    </section>
  )
}

export default ReviewForm
