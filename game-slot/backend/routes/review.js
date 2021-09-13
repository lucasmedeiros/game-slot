const express = require('express')
const checkJwt = require('../middlewares/jwt')
const {
  create,
  update,
  get,
  remove,
  getAll,
  getByUser,
  getByUserAndGame,
  like,
  dislike,
} = require('../controllers/review')
const router = express.Router()

router.get('/:id', get)
router.get('/game/:id', getAll)
router.get('/user/:userId', getByUser)
router.get('/game/:gameId/user/:userId', getByUserAndGame)
router.post('/', checkJwt, create)
router.put('/:id', checkJwt, update)
router.delete('/:id', checkJwt, remove)

router.post('/:id/like', checkJwt, like)
router.post('/:id/dislike', checkJwt, dislike)

module.exports = router
