const config = {}
const DEFAULT_SERVER_PORT = 5000

const port = process.env.NODE_ENV === 'production' ? process.env.PORT : null

config.mongoDB = {
  mongoDBUri: `${process.env.MONGODB_URI}`,
}

config.auth0 = {
  AUDIENCE: `${process.env.AUTH0_AUDIENCE}`,
  URI: `${process.env.AUTH0_URI}`,
}

config.host = {
  baseUrl: process.env.SERVER_BASE_URL || 'http://localhost',
  port: port || process.env.PORT || DEFAULT_SERVER_PORT,
  production: process.env.NODE_ENV === 'production',
}

module.exports = config
