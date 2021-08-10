const express = require('express')
const checkJwt = require('../middlewares/jwt')
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
router.post('/', checkJwt, create)
router.post('/:id/game', checkJwt, addGame)
router.post('/:id/game/remove', checkJwt, removeGame)
router.put('/:id', checkJwt, update)
router.delete('/:id', checkJwt, remove)

module.exports = router
