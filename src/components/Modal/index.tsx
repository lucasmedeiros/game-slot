import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactModal from 'react-modal'

import './Modal.css'

export interface ModalProps {
  isOpen: boolean
  onClose(): void
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={false}
      closeTimeoutMS={200}
      ariaHideApp={false}
      style={{
        content: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#27292c',
          border: 'none',
        },
        overlay: {
          backgroundColor: '#27292c',
        },
      }}
    >
      <button
        onClick={onClose}
        className="absolute"
        style={{ top: '30px', right: '50px' }}
      >
        <FontAwesomeIcon icon="times" color="white" size="2x" />
      </button>
      {children}
    </ReactModal>
  )
}

export default Modal
