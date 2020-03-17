require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const { users, steam } = require('./routes')
const { host, mongoDB } = require('./config')

const app = express()

mongoose.connect(mongoDB.mongoDBUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/users', users)
app.use('/steam', steam)

app.listen(host.port, () => {
  console.log(`Server listening on port ${host.baseUrl}:${host.port}`)
})
