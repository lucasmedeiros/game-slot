import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { Button } from '../../../styles'

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

const ReviewForm = () => {
  const [recommendation, setRecommendation] = useState<RecommendationValue>()

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
      alert('Please, select one of the three options for rating this game')
    } else {
      // TODO
      setRecommendation(undefined)
    }
  }

  return (
    <section className="text-white h-full py-10 flex flex-col justify-center">
      <form className="mb-4 rounded w-full md:w-100 flex flex-col">
        <textarea
          placeholder="Review this game"
          className="resize-none shadow-md appearance-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-600 text-3xl"
          rows={10}
        />
        <div className="flex items-center justify-around py-4">
          <h2 className="text-2xl text-center">Do you recommend this game?</h2>
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
            className="bg-gray-800 shadow-md hover:bg-gray-900 text-white font-bold py-3 px-4 rounded focus:outline-none text-3xl"
            type="button"
            onClick={onRecommendationSubmit}
          >
            SUBMIT REVIEW
          </Button>
        </div>
      </form>
    </section>
  )
}

export default ReviewForm
