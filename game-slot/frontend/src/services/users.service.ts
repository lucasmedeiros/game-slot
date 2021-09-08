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
