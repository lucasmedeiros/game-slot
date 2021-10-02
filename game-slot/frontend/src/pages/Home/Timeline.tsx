import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { ClipLoader } from 'react-spinners'
import { Link } from 'react-router-dom'
import Radium from 'radium'

import {
  getUserTimeline,
  PaginatedTimeline,
} from '../../services/users.service'
import { useCurrentUser } from '../../contexts/UserContext'
import GameReview from '../../components/GameReview'
import styles from './styles/timeline'

const Timeline = () => {
  const { getAccessTokenSilently } = useAuth0()
  const { user } = useCurrentUser()
  const [timeline, setTimeline] = useState<PaginatedTimeline>()
  const [loading, setLoading] = useState(true)
  const [limit, setLimit] = useState(10)

  function getMoreResults() {
    if (timeline?.hasNextPage) {
      setLimit((prev) => prev + 10)
    }
  }

  useEffect(() => {
    async function getTimeline() {
      if (user) {
        setLoading(true)
        const token = await getAccessTokenSilently()
        const timeline = await getUserTimeline(user._id, token, { limit })
        setTimeline(timeline)
        setLoading(false)
      }
    }

    getTimeline()
  }, [user, limit, getAccessTokenSilently])

  if (!timeline)
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

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <div style={styles.header}>
        <h2 style={styles.title}>Home page</h2>
        <Link
          to="/list"
          className="bg-red-600 text-white p-3 mb-3 w-full text-center block md:inline md:w-auto uppercase font-bold"
          style={{ borderRadius: '4px' }}
        >
          create game list
        </Link>
      </div>
      {timeline.reviews.map((review) => (
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
      {timeline.hasNextPage && (
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            padding: '3rem 0',
          }}
        >
          <button
            style={{
              padding: '1rem',
              color: 'white',
              background: '#2B6EAD',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.5 : 1,
            }}
            onClick={() => getMoreResults()}
          >
            Exibir mais resultados
          </button>
        </div>
      )}
      {user?.followings.length === 0 ? (
        <div
          style={{
            fontSize: '14px',
            color: '#A0AEC0',
            padding: '3rem 0',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          You don&apos;t follow anyone yet
        </div>
      ) : (
        (timeline.reviews.length === 0 || !timeline.hasNextPage) && (
          <div
            style={{
              fontSize: '14px',
              color: '#A0AEC0',
              padding: '3rem 0',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            There&apos;s no more results for your timeline
          </div>
        )
      )}
    </div>
  )
}

export default Radium(Timeline)
