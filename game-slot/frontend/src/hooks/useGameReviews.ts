/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import querystring from 'query-string'
import { callAPI } from '../services/request.service'
import { DEFAULT_PAGE_SIZE } from '../constants'

export interface IGameReview {
  _id: string
  gameId: string
  user: User
  text: string
  recommended: number
  createdAt: string
  updatedAt: string
}

export interface IGameReviewsDetails {
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
  update: (page?: number, limit?: number) => void
}

const useGameReviews = (appId: string, deps: any[] = []): ObjectGameReviews => {
  const [loading, setLoading] = useState<boolean>(true)
  const [result, setResult] = useState<IGameReviewsDetails>()

  const getGameReviews = async (
    page = 1,
    limit: number = DEFAULT_PAGE_SIZE
  ) => {
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

  const update = (page?: number, limit?: number) => {
    setLoading(true)
    getGameReviews(page, limit)
  }

  useEffect(() => {
    getGameReviews()
  }, [appId, ...deps])

  return {
    loading,
    result,
    update,
  }
}

export default useGameReviews
