import React from 'react'
import { useParams } from 'react-router-dom'

interface UserReviewsParams {
  id: string
}

const UserReviews: React.FC = () => {
  const { id } = useParams<UserReviewsParams>()
  return <div>User Reviews of user {id}</div>
}

export default UserReviews
