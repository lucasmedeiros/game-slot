export const SET_USER = 'SET_USER'
export const DELETE_USER = 'DELETE_USER'

interface SetUserAction {
  type: typeof SET_USER
  payload: User
}

interface DeleteUserAction {
  type: typeof DELETE_USER
  payload: null
}

export type UserActionTypes = SetUserAction | DeleteUserAction
