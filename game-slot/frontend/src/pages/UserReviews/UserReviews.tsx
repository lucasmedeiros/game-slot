import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import GameReview from '../../components/GameReview'
import { IGameReview } from '../../hooks/useGameReviews'
import { callAPI } from '../../services/request.service'
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

interface UserReviewsParams {
  nickname: string
}

const UserReviews: React.FC = () => {
  const { nickname } = useParams<UserReviewsParams>()
  const [user, setUser] = useState<User | undefined>()
  const [isFetching, setFetching] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const [reviews, setReviews] = useState<IGameReview[]>()

  useEffect(() => {
    const getUser = async () => {
      setFetching(true)
      const response = await getUserByNickname(nickname)
      if (!response) {
        setErrorMessage(`Sorry! User ${nickname} not found :(`)
      } else {
        setUser(response)
        setErrorMessage(undefined)
      }
    }

    getUser()
  }, [nickname])

  useEffect(() => {
    const getUserLists = async () => {
      if (user) {
        setFetching(true)
        const { data } = await callAPI(`review/user/${user._id}`, 'GET', null)
        setReviews(data)
        setFetching(false)
      }
    }

    getUserLists()
  }, [user])

  if (errorMessage) {
    return <div style={containerStyles}>{errorMessage}</div>
  }

  if (isFetching || !user || !reviews) {
    return (
      <div
        style={{
          width: '80%',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '100px',
        }}
      >
        <ClipLoader size={50} color="white" />
      </div>
    )
  }

  return (
    <div style={{ padding: '1rem 0', width: '80%', margin: '0 auto' }}>
      <UserContentHeader user={user} sectionContentName="reviews" />
      {reviews.map((review) => (
        <div
          key={review._id}
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            padding: '3rem',
            margin: '1rem 0',
            borderRadius: '4px',
            background: '#36383B',
          }}
        >
          <div>
            <GameReview review={review} />
          </div>
          <Link to={`/game/${review.gameId}`}>
            <img
              src={`https://steamcdn-a.akamaihd.net/steam/apps/${review.gameId}/header.jpg`}
              alt={`Review for game ${review.gameId}`}
              style={{
                marginLeft: '1rem',
                minWidth: '300px',
                width: '300px',
                height: '160px',
                marginBottom: '10px',
              }}
            />
          </Link>
        </div>
      ))}
    </div>
  )
}

export default UserReviews
