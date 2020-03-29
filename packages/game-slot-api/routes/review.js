const express = require('express')
const tokenCheck = require('../middlewares/jwt')
const { create, update, get, remove, getAll } = require('../controllers/review')
const router = express.Router()

router.get('/:id', tokenCheck, get)
router.get('/game/:id', getAll)
router.post('/', tokenCheck, create)
router.put('/:id', tokenCheck, update)
router.delete('/:id', tokenCheck, remove)

module.exports = router
