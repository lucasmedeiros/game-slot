const express = require('express')
const tokenCheck = require('../middlewares/jwt')
const {
  createReview,
  updateReview,
  getUserReview,
  deleteUserReview,
} = require('../controllers/review')
const router = express.Router()

router.get('/:id', tokenCheck, getUserReview)
router.post('/', tokenCheck, createReview)
router.put('/:id', tokenCheck, updateReview)
router.delete('/:id', tokenCheck, deleteUserReview)

module.exports = router
