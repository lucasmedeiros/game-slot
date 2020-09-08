export const CREATE_LIST = 'CREATE_LIST'
export const DELETE_LIST = 'DELETE_LIST'
export const SET_LISTS = 'SET_LISTS'
export const DELETE_LIST_ITEM = 'DELETE_LIST_ITEM'
export const ADD_ITEM = 'ADD_ITEM'

interface CreateListAction {
  type: typeof CREATE_LIST
  payload: GameList
}

interface DeleteListAction {
  type: typeof DELETE_LIST
  payload: string
}

interface SetListAction {
  type: typeof SET_LISTS
  payload: GameList[]
}

interface DeleteListItemAction {
  type: typeof DELETE_LIST_ITEM
  payload: {
    listId: string
    gameId: string
  }
}

interface AddItemAction {
  type: typeof ADD_ITEM
  payload: {
    listId: string
    game: IGame
  }
}

export type GameListActionTypes =
  | CreateListAction
  | DeleteListAction
  | SetListAction
  | DeleteListItemAction
  | AddItemAction
