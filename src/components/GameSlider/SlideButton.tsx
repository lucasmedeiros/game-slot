import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './SlideButton.scss'

const SlideButton = ({
  onClick,
  type,
}: {
  onClick: () => void
  type: string
}) => (
  <button className={`slide-button slide-button--${type}`} onClick={onClick}>
    <span>
      <FontAwesomeIcon icon="angle-down" color="white" size="2x" />
    </span>
  </button>
)

export default SlideButton
