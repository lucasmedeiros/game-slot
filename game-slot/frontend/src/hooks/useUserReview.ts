/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { IGameReview } from './useGameReviews'
import { useState, useEffect } from 'react'
import { callAPI } from '../services/request.service'

interface ObjectUserReview {
  loading: boolean
  existingReview: boolean
  update: () => void
  review: IGameReview | null
}

const useUserReview = (
  gameId: string,
  user?: IUser,
  deps: any[] = []
): ObjectUserReview => {
  const [loading, setLoading] = useState<boolean>(true)
  const [existingReview, setExistingReview] = useState<boolean>(false)
  const [review, setReview] = useState<IGameReview | null>(null)

  const getUserReview = async () => {
    if (user) {
      const response = await callAPI(`review/user/${gameId}`, 'GET', null)
      setReview(response.success ? response.data : null)
      setExistingReview(response.success ? response.data !== null : false)
    }
    setLoading(false)
  }

  const update = () => {
    getUserReview()
  }

  useEffect(() => {
    getUserReview()
  }, [gameId, ...deps])

  return {
    loading,
    existingReview,
    review,
    update,
  }
}

export default useUserReview
