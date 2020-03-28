const {
  createList,
  getUserLists,
  deleteUserList,
  addGameToList,
  removeGameFromList,
} = require('../services/list.service')

module.exports = {
  create: async function(req, res) {
    const { _id } = req.user
    const { name } = req.body

    try {
      const list = await createList({ userId: _id, name })
      return res.status(201).json(list)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },

  get: async function(req, res) {
    const { _id } = req.user

    try {
      const lists = await getUserLists({ userId: _id })
      return res.status(200).json(lists)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },

  remove: async function(req, res) {
    const { _id } = req.user
    const { id } = req.params

    try {
      const list = await deleteUserList({ userId: _id, listId: id })
      return res.status(200).json(list)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },

  update: async function(req, res) {
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

  removeGame: async function(req, res) {
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
