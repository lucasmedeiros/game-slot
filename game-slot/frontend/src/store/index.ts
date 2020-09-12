import { combineReducers, createStore } from 'redux'
import { userReducer } from './user/reducers'
import { gameListReducer } from './lists/reducers'

const rootReducer = combineReducers({
  userReducer,
  gameListReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)
