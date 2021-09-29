import React from 'react'
import { useParams } from 'react-router-dom'
import { useCurrentUser } from '../../contexts/UserContext'
import CurrentUserLists from './CurrentUserLists'

interface UserListParams {
  nickname: string
}

const UserList = () => {
  const { nickname } = useParams<UserListParams>()
  const { user } = useCurrentUser()

  if (user?.nickname === nickname) {
    return <CurrentUserLists />
  }

  return (
    <div style={{ color: 'white' }}>
      User List of user {nickname} [user lists page in progress]
    </div>
  )
}

export default UserList
