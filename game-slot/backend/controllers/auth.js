const User = require('../models/User')

module.exports = {
  /**
   * Register a new user
   *
   * @param {Request} req
   * @param {Response} res
   */
  signup: async function (req, res) {
    const { name, email } = req.body

    if (!name || !name.trim())
      return res.status(400).json({ error: `'name' field not provided` })

    if (!email || !email.trim())
      return res.status(400).json({ error: `'email' field not provided` })

    let user = await User.findOne({ email })

    if (user) return res.status(400).json({ error: 'user already exists' })

    user = await User.create({
      name: name.trim(),
      email: email.trim(),
    })

    return res.status(200).json({ user })
  },

  /**
   * Method for user login
   *
   * @param {Request} req
   * @param {Response} res
   */
  login: async function (req, res) {
    const { email } = req.body

    if (!email || !email.trim())
      return res.status(400).json({ error: `'email' not provided` })

    let user = await User.findOne({ email })
    if (!user) return res.status(400).json({ error: `user doesn't exist` })

    return res.status(200).json({ user })
  },

  /**
   * Method for removing one user
   *
   * @param {Request} req
   * @param {Response} res
   */
  remove: async function (req, res) {
    const user = await User.findOneAndDelete({ _id: req.params.id.trim() })
    if (!user) return res.status(400).json({ error: `user doesn't exist` })
    return res.status(200).json(user)
  },
}
