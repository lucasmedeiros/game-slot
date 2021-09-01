const express = require('express')
const checkJwt = require('../middlewares/jwt')
const { checkUser } = require('../middlewares/validateUser')
const { signup, login, remove } = require('../controllers/auth')
const router = express.Router()

router.get('/', checkJwt, login)
router.post('/signup', checkJwt, signup)
router.delete('/:id', checkJwt, checkUser, remove)

module.exports = router
