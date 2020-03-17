const express = require('express')
const fetch = require('node-fetch')
const tokenCheck = require('../middlewares/jwt')
const router = express.Router()

/* GET users listing. */
router.get('/', tokenCheck, async function(req, res, next) {
  const response = await fetch(
    'https://store.steampowered.com/api/appdetails?appids=70',
    {
      method: 'GET',
    }
  )
  res.send(await response.json())
})

module.exports = router
