import React, { useState, FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Modal from 'react-modal'
import { Button } from '../../styles'

import './ReviewModal.css'

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

const ReviewModal: FC<ReviewModalProps> = ({ isOpen, toggleModal }) => {
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
    setRecommendation(prev => (prev === value ? undefined : value))
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={toggleModal}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={false}
      closeTimeoutMS={200}
      style={{
        content: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#2c5282',
          border: 'none',
        },
        overlay: {
          backgroundColor: '#2c5282',
        },
      }}
    >
      <button
        onClick={toggleModal}
        className="absolute"
        style={{ top: '30px', right: '30px' }}
      >
        <FontAwesomeIcon icon="times" color="white" size="lg" />
      </button>
      <section className="bg-blue-800 text-white h-full py-10 flex flex-col justify-center items-center">
        <form className="mb-4 rounded w-70 md:w-100 flex flex-col">
          <h1 className="text-center">Hollow Knight: Silksong</h1>
          <textarea
            placeholder="Review this game"
            className="resize-none shadow-md appearance-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-blue-900"
            rows={8}
          />
          <h2 className="text-lg text-center py-4">
            Do you recommend this game?
          </h2>
          <div className="w-100 flex justify-around ">
            {reviewButtons.map((rvb, index) => (
              <Button
                className={`rounded py-4 px-4 ${
                  recommendation === rvb.value
                    ? 'bg-blue-700'
                    : 'hover:bg-blue-900'
                }`}
                onClick={e => onRecommendationChange(e, rvb.value)}
              >
                <FontAwesomeIcon
                  icon={getIcon(rvb.value)}
                  color="#fff"
                  size="2x"
                />
              </Button>
            ))}
          </div>
        </form>
        <Button
          className="bg-blue-700 shadow-md hover:bg-blue-500 text-white font-bold py-3 px-4 rounded focus:outline-none"
          type="button"
        >
          SUBMIT
        </Button>
      </section>
    </Modal>
  )
}

export default ReviewModal
