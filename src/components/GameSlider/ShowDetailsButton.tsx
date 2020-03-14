import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ShowDetailsButton.scss'

const ShowDetailsButton = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} className="show-details-button">
    <span>
      <FontAwesomeIcon icon="angle-down" color="white" size="2x" />
    </span>
  </button>
)

export default ShowDetailsButton
