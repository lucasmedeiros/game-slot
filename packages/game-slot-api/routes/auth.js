const express = require('express')
const fetch = require('node-fetch')
// const tokenCheck = require('../middlewares/jwt')
const { signup, login } = require('../controllers/auth')
const router = express.Router()

router.post('/', login)
router.post('/signup', signup)

module.exports = router
