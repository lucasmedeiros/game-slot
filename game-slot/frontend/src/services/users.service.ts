import querystring from 'query-string'
import { IGameReview } from '../hooks/useGameReviews'

import { callAPI } from './request.service'

export const getUserByNickname = async (
  userNickname: string
): Promise<User> => {
  const response = await callAPI(`users?nickname=${userNickname}`, 'GET', null)
  return response.data[0]
}

export const followUser = async (
  userToFollow: string,
  userFollower: string
): Promise<string> => {
  const response = await callAPI(`users/follow/${userToFollow}`, 'POST', {
    userId: userFollower,
  })

  return response.data
}

export const unfollowUser = async (
  userToUnfollow: string,
  userUnfollower: string
): Promise<string> => {
  const response = await callAPI(`users/unfollow/${userToUnfollow}`, 'POST', {
    userId: userUnfollower,
  })

  return response.data
}

export interface PaginatedTimeline {
  currentPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
  perPage: number
  reviews: IGameReview[]
  total: number
  totalPages: number
}

interface Query {
  page?: number
  limit?: number
}

export const getUserTimeline = async (
  user: string,
  token: string,
  query: Query = { limit: 10, page: 1 }
): Promise<PaginatedTimeline> => {
  const queryParams = querystring.stringify(query)
  const response = await callAPI(
    `review/user/${user}/timeline?${queryParams}`,
    'GET',
    null,
    token
  )

  return response.data
}
