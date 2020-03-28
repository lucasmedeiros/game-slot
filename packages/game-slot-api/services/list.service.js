const List = require('../models/List')
const { getGameById } = require('./steam.service')

module.exports = {
  createList: async function({ userId, name }) {
    if (!userId) throw new Error(`user id not provided`)
    if (!name) throw new Error(`list name not provided`)

    try {
      const list = await List.create({ userId, name, games: [] })
      return list
    } catch (error) {
      throw new Error(error.message)
    }
  },

  getUserLists: async function({ userId }) {
    if (!userId) throw new Error(`user id not provided`)

    try {
      const lists = await List.find({ userId })
      if (!lists) return []
      return lists
    } catch (error) {
      throw new Error(error.message)
    }
  },

  deleteUserList: async function({ userId, listId }) {
    if (!userId) throw new Error(`user id not provided`)
    if (!listId) throw new Error(`list id not provided`)

    try {
      const list = await List.findOne({ _id: listId })

      if (!list) throw new Error(`list not found`)

      if (list.userId.toString() === userId) {
        const listDeleted = await List.findByIdAndDelete(listId)
        return listDeleted
      } else throw new Error(`you don't have the permission for this action`)
    } catch (error) {
      throw new Error(error.message)
    }
  },

  addGameToList: async function({ userId, listId, gameId }) {
    if (!userId) throw new Error(`user id not provided`)
    if (!listId) throw new Error(`list id not provided`)
    if (!gameId) throw new Error(`game id not provided`)

    const game = await getGameById({ id: gameId.toString() })

    if (!game) throw new Error(`game not found`)

    try {
      const list = await List.findOne({ _id: listId })

      if (!list) throw new Error(`list not found`)

      if (list.userId.toString() === userId) {
        const games = list.games

        if (games.filter(g => g.steamAppId === gameId.toString()).length > 0) return list
        else {
          const updatedGames = [...games, game]
          const listUpdated = await List.findOneAndUpdate(
            { _id: listId },
            {
              games: updatedGames,
            },
            {
              new: true,
            }
          )
          return listUpdated
        }
      } else throw new Error(`you don't have the permission for this action`)
    } catch (error) {
      throw new Error(error.message)
    }
  },

  removeGameFromList: async function({ userId, listId, gameId }) {
    if (!userId) throw new Error(`user id not provided`)
    if (!listId) throw new Error(`list id not provided`)
    if (!gameId) throw new Error(`game id not provided`)

    try {
      const list = await List.findOne({ _id: listId })

      if (!list) throw new Error(`list not found`)

      if (list.userId.toString() === userId) {
        const games = list.games

        const updatedGames = games.filter(g => g.steamAppId !== gameId.toString())
        const listUpdated = await List.findOneAndUpdate(
          { _id: listId },
          {
            games: updatedGames,
          },
          {
            new: true,
          }
        )
        return listUpdated
      } else throw new Error(`you don't have the permission for this action`)
    } catch (error) {
      throw new Error(error.message)
    }
  },
}
