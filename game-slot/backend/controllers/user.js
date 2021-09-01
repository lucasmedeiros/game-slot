const User = require('../models/User')

module.exports = {
  list: async function (req, res) {
    const users = await User.find()
    return res.status(200).json(users)
  },
  getById: async function (req, res) {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ error: `'id' not provided` })
    }

    const user = await User.findById({ _id: id })

    if (!user) {
      return res.status(404).json({ error: `user not found` })
    }

    return res.status(200).json({ user })
  },
}
