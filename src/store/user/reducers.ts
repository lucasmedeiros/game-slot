import { UserActionTypes, SET_USER, DELETE_USER } from './types'

const getUserFromLocalStorage = (): User | undefined => {
  const userFromStorage = JSON.parse(localStorage.getItem('user') as string)

  if (userFromStorage) return userFromStorage

  return undefined
}

const initialState: UserState = {
  user: getUserFromLocalStorage(),
}

export const userReducer = (
  state = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      }
    case DELETE_USER:
      return {
        ...state,
        user: undefined,
      }
    default:
      return state
  }
}
