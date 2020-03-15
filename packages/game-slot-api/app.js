const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const { users, steam } = require('./routes')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/users', users)
app.use('/steam', steam)

app.listen(5000, () => {
  console.log(`Server listening on port 5000`)
})
