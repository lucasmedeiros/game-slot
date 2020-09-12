const express = require('express')
const router = express.Router()
const { getAppDetails, findGames } = require('../controllers/steam')

/* GET users listing. */
router.get('/appdetails/:appId', getAppDetails)
router.get('/find', findGames)

module.exports = router
