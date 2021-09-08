import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { useCurrentUser } from '../../contexts/UserContext'
import {
  followUser,
  getUserByNickname,
  unfollowUser,
} from '../../services/users.service'
import Reviews from './Reviews'
import Lists from './Lists'

interface UserPageProps {
  type?: string
  nickname: string
}

const containerStyles: React.CSSProperties = {
  width: '100vw',
  height: '85vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: '30px',
}

const UserPage: React.FC = () => {
  const { nickname } = useParams<UserPageProps>()
  const { user: currentUser, setUser: setCurrentUser } = useCurrentUser()
  const [user, setUser] = useState<User | undefined>()
  const [fetchingUser, setFetchingUser] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const [followButtonDisabled, setFollowButtonDisabled] = useState(true)
  const [currentUserIsFollowing, setCurrentUserIsFollowing] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      setErrorMessage(undefined)
      setFetchingUser(true)
      const response = await getUserByNickname(nickname)
      if (!response) {
        setErrorMessage(`Sorry! User ${nickname} not found :(`)
      } else {
        setUser(response)
      }
      setFetchingUser(false)
    }

    getUser()
  }, [nickname])

  useEffect(() => {
    if (currentUser && user) {
      setFollowButtonDisabled(nickname === currentUser.nickname)
      setCurrentUserIsFollowing(currentUser.followings.includes(user._id))
    }
  }, [nickname, currentUser, user])

  const onFollowButtonClick = async () => {
    if (user && currentUser) {
      setFollowButtonDisabled(true)
      if (currentUserIsFollowing) {
        await unfollowUser(user._id, currentUser._id)
        setUser({
          ...user,
          followers: user.followers.filter((id) => id !== currentUser._id),
        })
        setCurrentUser({
          ...currentUser,
          followings: currentUser.followings.filter((id) => id !== user._id),
        })
        setCurrentUserIsFollowing(false)
      } else {
        await followUser(user._id, currentUser._id)
        setUser({
          ...user,
          followers: [...user.followers, currentUser._id],
        })
        setCurrentUser({
          ...currentUser,
          followings: [...currentUser.followings, user._id],
        })
        setCurrentUserIsFollowing(true)
      }
      setFollowButtonDisabled(false)
    }
  }

  if (fetchingUser || !user) {
    return (
      <div style={containerStyles}>
        <ClipLoader size={100} color="white" />
      </div>
    )
  }

  if (errorMessage) {
    return <div style={containerStyles}>{errorMessage}</div>
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 3fr',
        justifyContent: 'center',
        alignContent: 'center',
        justifyItems: 'left',
        color: '#FFFFFF',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          justifySelf: 'center',
          marginTop: '20%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          style={{
            borderRadius: '50%',
            height: 'auto',
            width: '150px',
          }}
          src={user?.picture}
          alt=""
        />
        <p
          style={{
            fontSize: '32px',
            marginTop: '20px',
            marginBottom: '15px',
          }}
        >
          {user?.name}
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '16px',
          }}
        >
          <span>{user?.followers.length} Followers</span>
          <span style={{ marginLeft: '24px' }}>
            {user?.followings.length} Following
          </span>
        </div>
        <button
          style={{
            width: '106px',
            height: '50px',
            background: '#2B6EAD',
            borderRadius: '4px',
            marginTop: '39px',
            cursor: followButtonDisabled ? 'not-allowed' : 'pointer',
            opacity: followButtonDisabled ? 0.5 : 1,
          }}
          disabled={followButtonDisabled}
          onClick={onFollowButtonClick}
        >
          {currentUserIsFollowing ? 'Unfollow' : 'Follow'}
        </button>
      </div>
      <div
        style={{
          borderLeft: '0.991352px solid #36383B',
          padding: '77px',
        }}
      >
        <h3
          style={{
            fontSize: '32px',
            lineHeight: '37px',
          }}
        >
          Game Lists
        </h3>
        <Lists id={user._id} nickname={user.nickname} />
        <h3
          style={{
            fontSize: '32px',
            lineHeight: '37px',
          }}
        >
          Reviews
        </h3>
        <Reviews id={user._id} nickname={user.nickname} />
      </div>
    </div>
  )
}

export default UserPage
