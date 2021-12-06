import React from 'react'
import { Link } from 'react-router-dom'

interface MoreProps {
  type?: string
  nickname: string
}

function More({ type, nickname }: MoreProps) {
  return (
    <Link
      to={
        type === 'list'
          ? `/user/${nickname}/lists`
          : `/user/${nickname}/reviews`
      }
      style={{
        width: '206px',
        height: '160px',
        background: '#36383B',
        textAlign: 'center',
        paddingTop: '65px',
        padding: 'auto',
        fontSize: '30px',
      }}
    >
      More
    </Link>
  )
}

export default More
