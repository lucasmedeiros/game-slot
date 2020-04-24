/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import querystring from 'query-string'
import { callAPI } from '../services/request.service'

interface IGameReview {
  _id: string
  gameId: string
  userId: string
  text: string
  recommended: number
}

interface IGameReviewsDetails {
  count: {
    positive: number
    neutral: number
    negative: number
  }
  reviews: PaginatedResult<IGameReview>
}

interface ObjectGameReviews {
  loading: boolean
  result: IGameReviewsDetails | undefined
}

const useGameReviews = (
  appId: string,
  limit: number = 15,
  page: number = 1,
  deps: any[] = []
): ObjectGameReviews => {
  const [loading, setLoading] = useState<boolean>(true)
  const [result, setResult] = useState<IGameReviewsDetails>()

  useEffect(() => {
    const getGameReviews = async () => {
      const query = querystring.stringify({
        page,
        limit,
      })
      const url = `review/game/${appId}?${query}`
      const response = await callAPI(url, 'GET', null)

      if (response.success) {
        const { data } = response
        setResult(data)
      }

      setLoading(false)
    }

    getGameReviews()
  }, [appId, ...deps])

  return {
    loading,
    result,
  }
}

export default useGameReviews
