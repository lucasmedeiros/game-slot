import { callAPI } from './request.service'

export const getGameLists = async (user?: IUser): Promise<GameList[]> => {
  if (user) {
    const response = await callAPI(`list/user/${user._id}`, 'GET', null)
    return response.success ? response.data : []
  }
  return []
}

export const addGameToList = async (
  game: IGame,
  listId: string
): Promise<boolean> => {
  const response = await callAPI(`list/${listId}/game`, 'POST', {
    gameId: game.steamAppId,
  })

  return response.success
}
