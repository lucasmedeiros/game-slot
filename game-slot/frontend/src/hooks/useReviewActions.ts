/* eslint-disable @typescript-eslint/no-explicit-any */
import { callAPI } from '../services/request.service'
import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useCurrentUser } from '../contexts/UserContext'

interface ReviewActionsObject {
  submiting: boolean
  create: ({
    gameId,
    note,
    text,
  }: {
    gameId: string
    note: number
    text?: string
  }) => Promise<any>
  update: ({
    reviewId,
    note,
    text,
  }: {
    reviewId: string
    note: number
    text?: string
  }) => Promise<any>
  remove: ({ reviewId }: { reviewId: string }) => Promise<void>
  like: ({ reviewId }: { reviewId: string }) => Promise<void>
  dislike: ({ reviewId }: { reviewId: string }) => Promise<void>
}

const useReviewActions = (): ReviewActionsObject => {
  const [submiting, setSubmiting] = useState<boolean>(false)
  const { getAccessTokenSilently } = useAuth0()
  const { user } = useCurrentUser()

  const create = async ({
    gameId,
    text = '',
    note,
  }: {
    gameId: string
    note: number
    text?: string
  }) => {
    setSubmiting(true)
    const token = await getAccessTokenSilently()

    const response = await callAPI(
      'review',
      'POST',
      {
        gameId,
        note,
        text,
        userId: user?._id,
      },
      token
    )

    setSubmiting(false)

    if (response.success) return response.data

    throw new Error(response.message)
  }

  const update = async ({
    reviewId,
    note,
    text,
  }: {
    reviewId: string
    note: number
    text?: string
  }) => {
    setSubmiting(true)
    const token = await getAccessTokenSilently()

    const response = await callAPI(
      `review/${reviewId}`,
      'PUT',
      {
        note,
        text,
        userId: user?._id,
      },
      token
    )

    setSubmiting(false)

    if (response.success) return response.data

    throw new Error(response.message)
  }

  const remove = async ({ reviewId }: { reviewId: string }): Promise<void> => {
    setSubmiting(true)
    const token = await getAccessTokenSilently()

    const response = await callAPI(
      `review/${reviewId}`,
      'DELETE',
      { userId: user?._id },
      token
    )

    setSubmiting(false)

    if (!response.success) throw new Error(response.message)
  }

  const like = async ({ reviewId }: { reviewId: string }): Promise<void> => {
    const token = await getAccessTokenSilently()

    const response = await callAPI(
      `review/${reviewId}/like`,
      'POST',
      { userId: user?._id },
      token
    )

    if (!response.success) throw new Error(response.message)
  }

  const dislike = async ({ reviewId }: { reviewId: string }): Promise<void> => {
    const token = await getAccessTokenSilently()

    const response = await callAPI(
      `review/${reviewId}/dislike`,
      'POST',
      { userId: user?._id },
      token
    )

    if (!response.success) throw new Error(response.message)
  }

  return {
    create,
    submiting,
    update,
    remove,
    like,
    dislike,
  }
}

export default useReviewActions
