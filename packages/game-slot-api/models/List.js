const { Schema, model } = require('mongoose')

const List = new Schema({
  name: {
    type: String,
    required: true,
  },
  games: [Schema.Types.Mixed],
  user: {
    type: String,
    required: true,
  },
})

module.exports = model('List', List)
