const express = require('express')
const checkJwt = require('../middlewares/jwt')
const { checkUser } = require('../middlewares/validateUser')
const { login, remove } = require('../controllers/auth')
const router = express.Router()

router.post('/', checkJwt, login)
router.delete('/:id', checkJwt, checkUser, remove)

module.exports = router
