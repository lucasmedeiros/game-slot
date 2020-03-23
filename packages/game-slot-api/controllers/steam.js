const fs = require('fs')
const { getAppDetails } = require('../services/steam.service')

let rawData = fs.readFileSync('./lib/games_steam.json')
let games = JSON.parse(rawData)

module.exports = {
  getAppDetails: async function(req, res) {
    const { appId } = req.params
    const details = await getAppDetails({ appId })
    if (!details) return res.status(404).json({ error: `couldn't find resource` })
    const detailsData = details[appId].data
    const { screenshots, movies } = detailsData
    detailsData.screenshots = screenshots
      ? screenshots.map(screenshot => screenshot.path_full)
      : []
    detailsData.movies = movies ? movies.map(movie => movie.webm.max) : []
    return res.send(detailsData)
  },
  findGames: async function(req, res) {
    const { search } = req.query

    if (!search) return res.status(400).json({ error: `query 'search' not provided` })
    return res.send(
      games
        .filter(game => game.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
        .map(game => ({
          name: game.name,
          steamAppId: game.appid.toString(),
          imageUrl: game.headerImage,
        }))
    )
  },
}
