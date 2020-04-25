import { callAPI } from '../services/request.service'
import { useState } from 'react'

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
    gameId,
    recommendation,
    text,
  }: {
    gameId: string
    recommendation: RecommendationValue
    text?: string
  }) => Promise<any>
}

const useReviewActions = (): ReviewActionsObject => {
  const [submiting, setSubmiting] = useState<boolean>(false)

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

    const response = await callAPI('review', 'POST', {
      gameId,
      recommendation: recommendation ?? 'yes',
      text,
    })

    setSubmiting(false)

    console.log(response.success)

    if (response.success) return response.data

    throw new Error(response.message)
  }

  const update = async ({
    gameId,
    recommendation,
    text,
  }: {
    gameId: string
    recommendation: RecommendationValue
    text?: string
  }) => {
    setSubmiting(true)

    const response = await callAPI(`review/${gameId}`, 'PUT', {
      recommendation: recommendation,
      text: text,
    })

    setSubmiting(false)

    if (response.success) return response.data

    throw new Error(response.message)
  }

  return {
    create,
    submiting,
    update,
  }
}

export default useReviewActions
