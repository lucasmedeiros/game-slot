const express = require('express')
const tokenCheck = require('../middlewares/jwt')
const { create, update, get, remove } = require('../controllers/review')
const router = express.Router()

router.get('/:id', tokenCheck, get)
router.post('/', tokenCheck, create)
router.put('/:id', tokenCheck, update)
router.delete('/:id', tokenCheck, remove)

module.exports = router
