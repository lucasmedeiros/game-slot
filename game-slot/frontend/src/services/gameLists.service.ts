import { callAPI } from './request.service'

export const createGameList = async (
  name: string,
  userId: string,
  token: string
): Promise<GameList> => {
  const response = await callAPI(`list/user/${userId}`, 'POST', { name }, token)
  return response.data
}

export const removeGameFromList = async (
  listId: string,
  gameId: string,
  token: string
): Promise<GameList> => {
  const response = await callAPI(
    `list/${listId}/game/remove`,
    'POST',
    {
      gameId,
    },
    token
  )
  return response.data
}

export const deleteGameList = async (
  listId: string,
  token: string
): Promise<boolean> => {
  const response = await callAPI(`list/${listId}`, 'DELETE', null, token)
  return response.success
}

export const getGameLists = async (user: string): Promise<GameList[]> => {
  const response = await callAPI(`list/user/${user}`, 'GET', null)
  return response.success ? response.data : []
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
  listId: string,
  userId: string,
  token: string
): Promise<GameList> => {
  const response = await callAPI(
    `list/${listId}/game`,
    'POST',
    {
      gameId: game.steamAppId,
      userId,
    },
    token
  )

  return response.data
}
