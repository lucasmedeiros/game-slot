const { getAppDetails, findGames } = require('../services/steam.service')

module.exports = {
  getAppDetails: async function(req, res) {
    const { appId } = req.params
    const details = await getAppDetails({ appId })

    if (!details || !details[appId].success)
      return res.status(404).json({ error: `couldn't find resource` })

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

    try {
      const games = await findGames({ search })
      return res.status(200).json(games)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },
}
