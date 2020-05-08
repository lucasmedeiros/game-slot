const express = require('express')
const tokenCheck = require('../middlewares/jwt')
const {
  create,
  get,
  remove,
  addGame,
  removeGame,
  update,
  getOne,
} = require('../controllers/list')

const router = express.Router()

router.get('/:id', getOne)
router.get('/user/:id', get)
router.post('/', tokenCheck, create)
router.post('/:id/game', tokenCheck, addGame)
router.post('/:id/game/remove', tokenCheck, removeGame)
router.put('/:id', tokenCheck, update)
router.delete('/:id', tokenCheck, remove)

module.exports = router
