import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { useCurrentUser } from '../../contexts/UserContext'
import {
  followUser,
  getUserByNickname,
  unfollowUser,
} from '../../services/users.service'

const image =
  'https://www.comboinfinito.com.br/principal/wp-content/uploads/2019/12/the_witcher_3-_wild_hunt.jpg'

const data = {
  reviews: [
    {
      game: 'game',
      score: 4,
      image: image,
      comment: 'I like that one',
    },
    {
      game: 'game2',
      score: 5,
      image: image,
      comment: 'I love that one',
    },
    {
      game: 'game3',
      score: 1,
      image: image,
      comment: 'I hate that one',
    },
  ],
}

interface Review {
  score: number
  image: string
  comment: string
}

interface List {
  name: string
  image: string
}

function ListItem({ name, image }: List) {
  return (
    <div style={{ padding: '10px' }}>
      <img
        src={image}
        alt=""
        style={{
          width: '206px',
          height: '161px',
        }}
      />
      <div
        style={{
          fontSize: '16px',
          marginTop: '16px',
        }}
      >
        {name}
      </div>
    </div>
  )
}

function ReviewItem({ score, image, comment }: Review) {
  return (
    <div style={{ padding: '10px', textAlign: 'center' }}>
      <img
        src={image}
        alt=""
        style={{
          width: '206px',
          height: '161px',
          marginBottom: '10px',
        }}
      />
      <span
        style={{
          color: '#F1C644',
          width: '39px',
          height: '39px',
        }}
      >
        {[...Array(score)].map((i) => (
          <span key={i}>{'\u2605'}</span>
        ))}
        {[...Array(5 - score)].map((i) => (
          <span key={i}>{'\u2606'}</span>
        ))}
      </span>
      <p
        style={{
          marginTop: '10px',
        }}
      >
        {comment}
      </p>
    </div>
  )
}

interface UserPageProps {
  type?: string
  nickname: string
}

function More({ type, nickname }: UserPageProps) {
  return (
    <Link
      to={
        type === 'list'
          ? `/user/${nickname}/lists`
          : `/user/${nickname}/reviews`
      }
      style={{
        width: '206px',
        height: '161px',
        background: '#36383B',
        marginTop: '10px',
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

  const DEFAULT_LENGTH = 5

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

  if (fetchingUser) {
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            marginTop: '30px',
            marginBottom: '30px',
          }}
        >
          {data.reviews.slice(0, DEFAULT_LENGTH).map((review) => (
            <ListItem
              name={review.game}
              image={review.image}
              key={review.game}
            />
          ))}
          <More type="list" nickname={nickname} />
        </div>
        <h3
          style={{
            fontSize: '32px',
            lineHeight: '37px',
          }}
        >
          Reviews
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            marginTop: '30px',
            marginBottom: '30px',
          }}
        >
          {data.reviews.slice(0, DEFAULT_LENGTH).map((review) => (
            <ReviewItem
              score={review.score}
              image={review.image}
              comment={review.comment}
              key={review.game}
            />
          ))}
          <More type="reviews" nickname={nickname} />
        </div>
      </div>
    </div>
  )
}

export default UserPage
