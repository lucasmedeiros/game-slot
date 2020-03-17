const express = require('express')
const fetch = require('node-fetch')
const tokenCheck = require('../middlewares/jwt')
const router = express.Router()

/* GET users listing. */
router.get('/', tokenCheck, async function(req, res, next) {
  res.status(200).json({ message: 'to be done' })
})

module.exports = router
