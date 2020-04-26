import { callAPI } from './request.service'

export const getGameLists = async (user?: IUser): Promise<GameList[]> => {
  if (user) {
    const response = await callAPI('list', 'GET', null)
    return response.success ? response.data : []
  }
  return []
}
