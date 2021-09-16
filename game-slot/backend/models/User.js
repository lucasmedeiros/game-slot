const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  picture: String,
  followers: [
    {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      index: true,
    },
  ],
  followings: [
    {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      index: true,
    },
  ],
})

module.exports = model('User', UserSchema)
