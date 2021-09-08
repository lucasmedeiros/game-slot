import React from 'react'
import { useParams } from 'react-router-dom'

interface UserReviewsParams {
  nickname: string
}

const UserReviews: React.FC = () => {
  const { nickname } = useParams<UserReviewsParams>()
  return <div>User Reviews of user {nickname}</div>
}

export default UserReviews
