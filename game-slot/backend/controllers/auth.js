const User = require('../models/User')

module.exports = {
  /**
   * Method for user login
   *
   * @param {Request} req
   * @param {Response} res
   */
  login: async function (req, res) {
    const { name, email } = req.body

    if (!email || !email.trim())
      return res.status(400).json({ error: `email not provided` })

    let user = await User.findOne({ email })
    let statusCode = 200
    if (!user) {
      if (!name || !name.trim())
        return res.status(400).json({ error: `name not provided` })

      user = await User.create({
        name: name.trim(),
        email: email.trim(),
      })

      statusCode = 201
    }

    return res.status(statusCode).json({ user })
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
