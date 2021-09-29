import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { ClipLoader } from 'react-spinners'
import { Link } from 'react-router-dom'

import {
  getUserTimeline,
  PaginatedTimeline,
} from '../../services/users.service'
import { useCurrentUser } from '../../contexts/UserContext'
import GameReview from '../../components/GameReview'

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

  if (!timeline) return <ClipLoader size={50} color="white" />

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <h2 style={{ color: 'white', fontSize: '32px', margin: '1rem 0' }}>
        Página Inicial
      </h2>
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
            onClick={() => getMoreResults}
          >
            Exibir mais resultados
          </button>
        </div>
      )}
      {(timeline.reviews.length === 0 || !timeline.hasNextPage) && (
        <div
          style={{
            fontSize: '14px',
            color: '#A0AEC0',
            padding: '3rem 0',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          No momento, não há mais resultados para sua timeline
        </div>
      )}
    </div>
  )
}

export default Timeline
