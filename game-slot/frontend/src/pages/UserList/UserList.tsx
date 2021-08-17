import React from 'react'
import { useParams } from 'react-router-dom'

interface UserListParams {
  id: string
}

const UserList: React.FC = () => {
  const { id } = useParams<UserListParams>()
  return <div>User List of user {id}</div>
}

export default UserList
