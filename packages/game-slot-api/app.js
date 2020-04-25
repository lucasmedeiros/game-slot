require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const { steam, auth, review, list } = require('./routes')
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

app.use('/steam', steam)
app.use('/auth', auth)
app.use('/review', review)
app.use('/list', list)

if (host.production) app.listen(host.port)
else
  app.listen(host.port, () => {
    console.log(`Server listening on port ${host.baseUrl}:${host.port}`)
  })
