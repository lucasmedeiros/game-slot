const { Router } = require('express')
const { list, getById, follow, unfollow } = require('../controllers/user')
const router = Router()

router.get('/', list)
router.get('/:id', getById)
router.post('/follow/:id', follow)
router.post('/unfollow/:id', unfollow)

module.exports = router
