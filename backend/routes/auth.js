const express = require('express')
const tokenCheck = require('../middlewares/jwt')
const { checkUser } = require('../middlewares/validateUser')
const { signup, login, remove } = require('../controllers/auth')
const router = express.Router()

router.post('/', login)
router.post('/signup', signup)
router.delete('/:id', tokenCheck, checkUser, remove)

module.exports = router
