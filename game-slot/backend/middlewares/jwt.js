const jwtMiddleware = require('express-jwt')
const { jwt } = require('../config')
const jwtCheck = jwtMiddleware({
  secret: jwt.SECRET_KEY,
  algorithms: ['HS256'],
})

module.exports = jwtCheck
