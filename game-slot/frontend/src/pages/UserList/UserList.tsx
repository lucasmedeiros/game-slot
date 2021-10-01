import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { Link } from 'react-router-dom'

import { useCurrentUser } from '../../contexts/UserContext'
import UserListsDisplay from './UserListsDisplay'
import { RootState } from '../../store'
import { getGameLists } from '../../services/gameLists.service'
import { getUserByNickname } from '../../services/users.service'
import UserContentHeader from '../../components/UserContentHeader'

const containerStyles: React.CSSProperties = {
  width: '100vw',
  height: '85vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: '30px',
}

const CurrentUser = () => {
  const lists = useSelector(
    (state: RootState) => state.gameListReducer.gameLists
  )

  return <UserListsDisplay lists={lists} currentUser />
}

interface DefaultUserProps {
  nickname: string
}
const DefaultUser = ({ nickname }: DefaultUserProps) => {
  const [user, setUser] = useState<User | undefined>()
  const [isFetching, setFetching] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const [userLists, setUserLists] = useState<GameList[]>()

  useEffect(() => {
    const getUser = async () => {
      setFetching(true)
      const response = await getUserByNickname(nickname)
      if (!response) {
        setErrorMessage(`Sorry! User ${nickname} not found :(`)
      } else {
        setUser(response)
      }
    }

    getUser()
  }, [nickname])

  useEffect(() => {
    const getUserLists = async () => {
      if (user) {
        setFetching(true)
        const lists = await getGameLists(user._id)
        setUserLists(lists)
        setFetching(false)
      }
    }

    getUserLists()
  }, [user])

  if (errorMessage) {
    return <div style={containerStyles}>{errorMessage}</div>
  }

  if (isFetching || !user || !userLists) {
    return (
      <div style={containerStyles}>
        <ClipLoader size={100} color="white" />
      </div>
    )
  }

  return (
    <div>
      <UserContentHeader user={user} sectionContentName="game lists" />
      <UserListsDisplay lists={userLists} />
    </div>
  )
}

interface UserListParams {
  nickname: string
}

const UserList = () => {
  const { nickname } = useParams<UserListParams>()
  const { user } = useCurrentUser()

  return (
    <div
      style={{
        padding: '2rem',
      }}
    >
      {user?.nickname === nickname ? (
        <>
          <UserContentHeader user={user} sectionContentName="game lists" />
          <CurrentUser />
        </>
      ) : (
        <DefaultUser nickname={nickname} />
      )}
    </div>
  )
}

export default UserList
