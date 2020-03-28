import { combineReducers, createStore } from 'redux'
import { userReducer } from './user/reducers'

const rootReducer = combineReducers({
  userReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)
