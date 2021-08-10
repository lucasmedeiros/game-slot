const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
const { auth0 } = require('../config')

const uri = auth0.URI
const audience = auth0.AUDIENCE

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${uri}/.well-known/jwks.json`,
  }),
  audience,
  issuer: [uri],
  algorithms: ['RS256'],
})

module.exports = checkJwt
