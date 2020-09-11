const fs = require('fs')
const steamService = require('../services/steam.service')

const SAVED_GAMES_URL = './lib/games_steam.json'

async function getGame(appId) {
  try {
    if (!appId) throw new Error('steam app id required')

    const steamApiResponse = await steamService.getAppDetails({ appId })

    const notFoundGameMessage = `game ${appId} doesn't exist on steam`

    if (!steamApiResponse) throw new Error(notFoundGameMessage)

    const gameData = steamApiResponse[appId]

    if (!gameData.success) throw new Error(notFoundGameMessage)

    const game = gameData.data

    return {
      error: false,
      game,
    }
  } catch (error) {
    return {
      error: true,
      message: error.message,
    }
  }
}

function getSavedGames() {
  const rawData = fs.readFileSync(SAVED_GAMES_URL)
  return JSON.parse(rawData)
}

function saveGame(savedGames) {
  const jsonString = JSON.stringify(savedGames)
  fs.writeFileSync(SAVED_GAMES_URL, jsonString)
}

async function addGame(savedGames, newGame) {
  const found = savedGames.find(el => el.appid.toString() === newGame.steam_appid.toString())
  if (!found) {
    if (newGame.type === 'game') {
      savedGames.push({
        name: newGame.name,
        appid: newGame.steam_appid,
        headerImage: `https://steamcdn-a.akamaihd.net/steam/apps/${newGame.steam_appid}/header.jpg`,
      })
      saveGame(savedGames)
      console.log(`game ${newGame.name} added successfully`)
    } else {
      console.log('the app is not a game')
    }
  } else {
    console.log(`game ${found.name} already registered`)
  }
}

async function update() {
  const savedGames = getSavedGames()
  const args = process.argv.slice(2)
  const [id] = args
  const { error, game, message } = await getGame(id)
  if (!error) {
    await addGame(savedGames, game)
  } else {
    console.log(message)
  }
}

update()
