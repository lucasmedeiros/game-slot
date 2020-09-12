import { DELETE_USER, SET_USER, UserActionTypes } from './types'

export const setUser = (user: User): UserActionTypes => ({
  type: SET_USER,
  payload: user,
})

export const deleteUser = (): UserActionTypes => ({
  type: DELETE_USER,
  payload: null,
})
