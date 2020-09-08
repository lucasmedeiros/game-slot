import {
  GameListActionTypes,
  CREATE_LIST,
  DELETE_LIST,
  SET_LISTS,
  DELETE_LIST_ITEM,
  ADD_ITEM,
} from './types'

export const createGameList = (list: GameList): GameListActionTypes => ({
  type: CREATE_LIST,
  payload: list,
})

export const deleteGameList = (listId: string): GameListActionTypes => ({
  type: DELETE_LIST,
  payload: listId,
})

export const setGameLists = (lists: GameList[]): GameListActionTypes => ({
  type: SET_LISTS,
  payload: lists,
})

export const deleteGameListItem = (
  listId: string,
  gameId: string
): GameListActionTypes => ({
  type: DELETE_LIST_ITEM,
  payload: {
    gameId,
    listId,
  },
})

export const addItemToList = (
  listId: string,
  game: IGame
): GameListActionTypes => ({
  type: ADD_ITEM,
  payload: {
    listId,
    game,
  },
})
