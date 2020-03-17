const fs = require('fs')
const { getAppDetails } = require('../services/steam.service')

let rawData = fs.readFileSync('./lib/games_steam.json')
let games = JSON.parse(rawData)

module.exports = {
  getAppDetails: async function(req, res, next) {
    const details = await getAppDetails({ appId: req.params.appId })
    if (!details) return res.status(404).json({ error: `couldn't find resource` })
    return res.send(details)
  },
  findGames: async function(req, res, next) {
    const { search } = req.query

    if (!search) return res.status(400).json({ error: `query 'search' not provided` })
    return res.send(
      games.filter(game => game.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
    )
  },
}
