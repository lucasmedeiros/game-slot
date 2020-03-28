const fs = require('fs')
const fetch = require('node-fetch')

let rawData = fs.readFileSync('./lib/games_steam.json')
let games = JSON.parse(rawData)

module.exports = {
  getAppDetails: async ({ appId }) => {
    const url = `https://store.steampowered.com/api/appdetails?appids=${appId}`
    const response = await fetch(url, {
      method: 'GET',
    })
    const details = await response.json()
    return details
  },

  findGames: async function({ search }) {
    if (!search) throw new Error(`query 'search' not provided`)
    return games
      .filter(game => game.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      .map(game => ({
        name: game.name,
        steamAppId: game.appid.toString(),
        imageUrl: game.headerImage,
      }))
  },

  getGameById: async function({ id }) {
    if (!id) throw new Error(`game id not provided`)

    const found = games.find(game => game.appid.toString() === id)

    return {
      name: found.name,
      steamAppId: found.appid.toString(),
      imageUrl: found.headerImage,
    }
  },
}
