const fs = require('fs')

let rawData = fs.readFileSync('./lib/games_steam.json')
let games = JSON.parse(rawData)

console.log(
  games.filter(
    game =>
      game.name.toLowerCase().indexOf('hollow knight'.toLowerCase()) !== -1
  )
)
