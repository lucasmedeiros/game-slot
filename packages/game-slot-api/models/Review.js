const { Schema, model } = require('mongoose')

const ReviewSchema = new Schema({
  gameId: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  recommended: {
    type: Boolean,
    required: true,
  },
  text: {
    type: String,
    required: false,
  },
})

module.exports = model('Review', ReviewSchema)
