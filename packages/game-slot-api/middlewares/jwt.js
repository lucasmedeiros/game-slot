const jwtMiddleware = require('express-jwt')
const { jwt } = require('../config')
const jwtCheck = jwtMiddleware({ secret: jwt.SECRET_KEY })

module.exports = jwtCheck
