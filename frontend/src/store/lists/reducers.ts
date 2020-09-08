import {
  GameListActionTypes,
  CREATE_LIST,
  DELETE_LIST,
  SET_LISTS,
  DELETE_LIST_ITEM,
  ADD_ITEM,
} from './types'

interface GameListState {
  gameLists: GameList[]
}

const initialState: GameListState = {
  gameLists: [],
}

export const gameListReducer = (
  state = initialState,
  action: GameListActionTypes
): GameListState => {
  switch (action.type) {
    case CREATE_LIST:
      return {
        gameLists: [...state.gameLists, action.payload],
      }
    case DELETE_LIST:
      return {
        gameLists: state.gameLists.filter(
          (item) => item._id !== action.payload
        ),
      }
    case SET_LISTS:
      return {
        gameLists: action.payload,
      }
    case DELETE_LIST_ITEM:
      return {
        gameLists: state.gameLists.map((item) =>
          item._id === action.payload.listId
            ? {
                ...item,
                games: item.games.filter(
                  (game) => game.steamAppId !== action.payload.gameId
                ),
              }
            : item
        ),
      }
    case ADD_ITEM:
      return {
        gameLists: state.gameLists.map((item) =>
          item._id === action.payload.listId
            ? {
                ...item,
                games: item.games.includes(action.payload.game)
                  ? item.games
                  : [...item.games, action.payload.game],
              }
            : item
        ),
      }
    default:
      return state
  }
}
