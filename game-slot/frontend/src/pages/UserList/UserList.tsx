import React from 'react'
import { useParams } from 'react-router-dom'

interface UserListParams {
  nickname: string
}

const UserList: React.FC = () => {
  const { nickname } = useParams<UserListParams>()
  return <div>User List of user {nickname}</div>
}

export default UserList
