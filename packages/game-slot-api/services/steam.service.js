const fetch = require('node-fetch')

module.exports = {
  getAppDetails: async ({ appId }) => {
    const url = `https://store.steampowered.com/api/appdetails?appids=${appId}`
    const response = await fetch(url, {
      method: 'GET',
    })
    const details = await response.json()
    return details
  },
}
