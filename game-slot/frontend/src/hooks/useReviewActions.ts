/* eslint-disable @typescript-eslint/no-explicit-any */
import { callAPI } from '../services/request.service'
import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

interface ReviewActionsObject {
  submiting: boolean
  create: ({
    gameId,
    recommendation,
    text,
  }: {
    gameId: string
    recommendation: RecommendationValue
    text?: string
  }) => Promise<any>
  update: ({
    reviewId,
    recommendation,
    text,
  }: {
    reviewId: string
    recommendation: RecommendationValue
    text?: string
  }) => Promise<any>
  remove: ({ reviewId }: { reviewId: string }) => Promise<void>
}

const useReviewActions = (): ReviewActionsObject => {
  const [submiting, setSubmiting] = useState<boolean>(false)
  const { getAccessTokenSilently } = useAuth0()

  const create = async ({
    gameId,
    text = '',
    recommendation,
  }: {
    gameId: string
    recommendation: RecommendationValue
    text?: string
  }) => {
    setSubmiting(true)
    const token = await getAccessTokenSilently()

    const response = await callAPI('review', 'POST', {
      gameId,
      recommendation: recommendation ?? 'yes',
      text,
      token,
    })

    setSubmiting(false)

    if (response.success) return response.data

    throw new Error(response.message)
  }

  const update = async ({
    reviewId,
    recommendation,
    text,
  }: {
    reviewId: string
    recommendation: RecommendationValue
    text?: string
  }) => {
    setSubmiting(true)
    const token = await getAccessTokenSilently()

    const response = await callAPI(`review/${reviewId}`, 'PUT', {
      recommendation: recommendation,
      text,
      token,
    })

    setSubmiting(false)

    if (response.success) return response.data

    throw new Error(response.message)
  }

  const remove = async ({ reviewId }: { reviewId: string }): Promise<void> => {
    setSubmiting(true)
    const token = await getAccessTokenSilently()

    const response = await callAPI(`review/${reviewId}`, 'DELETE', null, token)

    setSubmiting(false)

    if (!response.success) throw new Error(response.message)
  }

  return {
    create,
    submiting,
    update,
    remove,
  }
}

export default useReviewActions
