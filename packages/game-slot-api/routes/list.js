const express = require('express')
const tokenCheck = require('../middlewares/jwt')
const {
  create,
  get,
  remove,
  addGame,
  removeGame,
  update,
} = require('../controllers/list')

const router = express.Router()

router.get('/', tokenCheck, get)
router.post('/', tokenCheck, create)
router.put('/:id', tokenCheck, update)
router.post('/:id/game', tokenCheck, addGame)
router.post('/:id/game/remove', tokenCheck, removeGame)
router.delete('/:id', tokenCheck, remove)

module.exports = router
