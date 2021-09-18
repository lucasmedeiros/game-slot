const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ReviewSchema = new Schema(
  {
    gameId: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    note: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      required: false,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

ReviewSchema.plugin(mongoosePaginate)

module.exports = model('Review', ReviewSchema)
