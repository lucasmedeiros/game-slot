const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { jwt } = require('../config')
const User = require('../models/User')

module.exports = {
  /**
   * Register a new user
   *
   * @param {Request} req
   * @param {Response} res
   */
  signup: async function(req, res) {
    const { name, password, confirmPassword, email } = req.body

    if (!name || !name.trim())
      return res.status(400).json({ error: `'name' field not provided` })

    if (!password || !password.trim())
      return res.status(400).json({ error: `'password' field not provided` })

    if (!confirmPassword || !confirmPassword.trim())
      return res.status(400).json({ error: `'confirmPassword' field not provided` })

    if (!email || !email.trim())
      return res.status(400).json({ error: `'email' field not provided` })

    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ error: `'password' and 'confirmPassword' must match` })

    let user = await User.findOne({ email })

    if (user) return res.status(400).json({ error: 'user already exists' })

    user = await User.create({
      name: name.trim(),
      email: email.trim(),
      password: await bcrypt.hash(password.trim(), 10),
    })

    const { password: _p, ...userWithoutPassword } = user._doc

    return res.status(200).json({ user: userWithoutPassword })
  },

  /**
   * Method for user login
   *
   * @param {Request} req
   * @param {Response} res
   */
  login: async function(req, res) {
    const { email, password } = req.body

    if (!email || !email.trim())
      return res.status(400).json({ error: `'email' not provided` })

    if (!password || !password.trim())
      return res.status(400).json({ error: `'password'not provided` })

    let user = await User.findOne({ email })
    if (!user) return res.status(400).json({ error: `user doesn't exist` })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ error: 'incorrect password' })

    const { password: _p, ...userWithoutPassword } = user._doc
    const token = jsonwebtoken.sign(userWithoutPassword, jwt.SECRET_KEY)
    return res.status(200).json({ user: userWithoutPassword, token })
  },

  /**
   * Method for removing one user
   *
   * @param {Request} req
   * @param {Response} res
   */
  remove: async function(req, res) {
    const user = await User.findOneAndDelete({ _id: req.params.id.trim() })
    const { password: _p, ...userWithoutPassword } = user._doc
    return res.status(200).json(userWithoutPassword)
  },
}
