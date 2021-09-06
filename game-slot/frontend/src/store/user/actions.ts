import { SET_USER, UserActionTypes } from './types'

export const setUser = (user: User): UserActionTypes => ({
  type: SET_USER,
  payload: user,
})
