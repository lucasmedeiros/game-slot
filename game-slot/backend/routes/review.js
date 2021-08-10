const express = require('express')
const checkJwt = require('../middlewares/jwt')
const {
  create,
  update,
  get,
  remove,
  getAll,
  getByUserAndGame,
} = require('../controllers/review')
const router = express.Router()

router.get('/:id', checkJwt, get)
router.get('/game/:id', getAll)
router.get('/user/:gameId', checkJwt, getByUserAndGame)
router.post('/', checkJwt, create)
router.put('/:id', checkJwt, update)
router.delete('/:id', checkJwt, remove)

module.exports = router
