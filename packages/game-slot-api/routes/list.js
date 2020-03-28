const express = require('express')
const tokenCheck = require('../middlewares/jwt')
const { create, get, remove, update, removeGame } = require('../controllers/list')

const router = express.Router()

router.get('/', tokenCheck, get)
router.post('/', tokenCheck, create)
router.put('/:id', tokenCheck, update)
router.put('/:id/game', tokenCheck, removeGame)
router.delete('/:id', tokenCheck, remove)

module.exports = router
