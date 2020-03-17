const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { jwt } = require('../config')
const User = require('../models/User')

module.exports = {
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
      name,
      email,
      password: await bcrypt.hash(password, 10),
    })

    const { password: _p, ...userWithoutPassword } = user._doc

    return res.status(200).json({ user: userWithoutPassword })
  },
  login: async function(req, res) {
    const { email, password } = req.body

    let user = await User.findOne({ email })
    if (!user) return res.status(400).json({ error: `user doesn't exist` })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ error: 'incorrect password' })

    const { password: _p, ...userWithoutPassword } = user._doc
    const token = jsonwebtoken.sign(userWithoutPassword, jwt.SECRET_KEY)
    return res.status(200).json({ user: userWithoutPassword, token })
  },
}
