const {
  createList,
  getUserLists,
  deleteUserList,
  addGameToList,
  removeGameFromList,
  updateList,
  getList,
} = require('../services/list.service')

module.exports = {
  create: async function (req, res) {
    const { userId } = req.params
    const { name } = req.body

    try {
      const list = await createList({ userId, name })
      return res.status(201).json(list)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },

  get: async function (req, res) {
    const { userId } = req.params

    try {
      const lists = await getUserLists({ userId })
      return res.status(200).json(lists)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },

  getOne: async function (req, res) {
    const { id } = req.params
    try {
      const list = await getList({ listId: id })
      return res.status(200).json(list)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },

  update: async function (req, res) {
    const { id } = req.params
    const { userId, name, games } = req.body

    try {
      const list = await updateList({
        listId: id,
        userId,
        name,
        games,
      })
      return res.status(200).json(list)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },

  remove: async function (req, res) {
    const { userId } = req.body
    const { id } = req.params

    try {
      const list = await deleteUserList({ userId, listId: id })
      return res.status(200).json(list)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },

  addGame: async function (req, res) {
    const { id } = req.params
    const { gameId, userId } = req.body

    try {
      const list = await addGameToList({ userId, listId: id, gameId })
      return res.status(200).json(list)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },

  removeGame: async function (req, res) {
    const { id } = req.params
    const { gameId, userId } = req.body

    try {
      const list = await removeGameFromList({ userId, listId: id, gameId })
      return res.status(200).json(list)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },
}
