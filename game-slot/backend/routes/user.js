const { Router } = require('express')
const { list, getById } = require('../controllers/user')
const router = Router()

router.get('/', list)
router.get('/:id', getById)

module.exports = router
