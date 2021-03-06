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
    const { _id } = req.user
    const { name } = req.body

    try {
      const list = await createList({ userId: _id, name })
      return res.status(201).json(list)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },

  get: async function (req, res) {
    const { id } = req.params

    try {
      const lists = await getUserLists({ userId: id })
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
    const { _id } = req.user
    const { id } = req.params
    const { name, games } = req.body

    try {
      const list = await updateList({
        listId: id,
        userId: _id,
        name,
        games,
      })
      return res.status(200).json(list)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },

  remove: async function (req, res) {
    const { _id } = req.user
    const { id } = req.params

    try {
      const list = await deleteUserList({ userId: _id, listId: id })
      return res.status(200).json(list)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },

  addGame: async function (req, res) {
    const { _id } = req.user
    const { id } = req.params
    const { gameId } = req.body

    try {
      const list = await addGameToList({ userId: _id, listId: id, gameId })
      return res.status(200).json(list)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },

  removeGame: async function (req, res) {
    const { _id } = req.user
    const { id } = req.params
    const { gameId } = req.body

    try {
      const list = await removeGameFromList({ userId: _id, listId: id, gameId })
      return res.status(200).json(list)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },
}
