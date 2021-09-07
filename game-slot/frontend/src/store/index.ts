import { combineReducers, createStore } from 'redux'
import { gameListReducer } from './lists/reducers'

const rootReducer = combineReducers({
  gameListReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)
