import { callAPI } from './request.service'

export const createGameList = async (name: string): Promise<GameList> => {
  const response = await callAPI(`list`, 'POST', { name })
  return response.data
}

export const removeGameFromList = async (
  listId: string,
  gameId: string
): Promise<GameList> => {
  const response = await callAPI(`list/${listId}/game/remove`, 'POST', {
    gameId,
  })
  return response.data
}

export const deleteGameList = async (listId: string): Promise<boolean> => {
  const response = await callAPI(`list/${listId}`, 'DELETE', null)
  return response.success
}

export const getGameLists = async (user?: IUser): Promise<GameList[]> => {
  if (user) {
    const response = await callAPI(`list/user/${user._id}`, 'GET', null)
    return response.success ? response.data : []
  }
  return []
}

export const getOneGameList = async (
  listId: string
): Promise<GameList | null> => {
  const response = await callAPI(`list/${listId}`, 'GET', null)

  if (response.success) return response.data

  return null
}

export const addGameToList = async (
  game: IGame,
  listId: string
): Promise<GameList> => {
  const response = await callAPI(`list/${listId}/game`, 'POST', {
    gameId: game.steamAppId,
  })

  return response.data
}
