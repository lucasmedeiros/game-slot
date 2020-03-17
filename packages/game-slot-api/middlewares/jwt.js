const jwtMiddleware = require('express-jwt-middleware')
const { jwt } = require('../config')
const jwtCheck = jwtMiddleware(jwt.SECRET_KEY)

module.exports = jwtCheck
