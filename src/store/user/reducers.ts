import { UserActionTypes, SET_USER, DELETE_USER } from './types'
import { getFromLocalStorage } from '../../utils'

const initialState: UserState = {
  user: getFromLocalStorage('user'),
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
