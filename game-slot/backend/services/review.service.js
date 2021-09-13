const Review = require('../models/Review')

const UNAUTHORIZED_MESSAGE = `you don't have the permission for this action`

module.exports = {
  createUserReview: async function ({ gameId, userId, text, note }) {
    if (!userId) throw new Error('user id not provided')
    if (!gameId) throw new Error('game steam id not provided')

    if (note < 0 || note > 5)
      throw new Error(
        'invalid recommendation value. Only integer values between 0-5'
      )

    try {
      const reviewCreated = await Review.create({
        gameId,
        user: userId,
        text,
        note,
      })

      return reviewCreated
    } catch (error) {
      throw new Error(error.message)
    }
  },

  updateUserReview: async function ({ reviewId, userId, text, note }) {
    if (!userId) throw new Error('user id not provided')
    if (!reviewId) throw new Error('review id not provided')

    try {
      const reviewToUpdate = await Review.findOne({ _id: reviewId })

      if (!reviewToUpdate) throw new Error('review not found')

      if (reviewToUpdate.user.toString() === userId) {
        const body = {}

        if (note) {
          if (note < 0 || note > 5)
            throw new Error(
              'invalid recommendation value. Only integer values between 0-5'
            )
          body.note = note
        }

        if (text) body.text = text

        const reviewUpdated = await Review.findOneAndUpdate(
          { _id: reviewId },
          body,
          {
            new: true,
          }
        )
        return reviewUpdated
      } else throw new Error(UNAUTHORIZED_MESSAGE)
    } catch (error) {
      throw new Error(error.message)
    }
  },

  getReview: async function ({ reviewId }) {
    if (!reviewId) throw new Error('review id not provided')

    try {
      const review = await Review.findOne({ _id: reviewId })

      if (!review) throw new Error('review not found')

      return review
    } catch (error) {
      throw new Error(error.message)
    }
  },

  getUserReviews: async function (userId) {
    if (!userId) throw new Error('user id not provided')

    try {
      const review = await Review.find({ user: userId })
      return review
    } catch (error) {
      throw new Error(error.message)
    }
  },

  getUserReviewByGame: async function ({ userId, gameId }) {
    if (!userId) throw new Error('user id not provided')
    if (!gameId) throw new Error('game id not provided')

    try {
      const review = await Review.findOne({ gameId, user: userId })
      return review
    } catch (error) {
      throw new Error(error.message)
    }
  },

  deleteUserReview: async function ({ reviewId, userId }) {
    if (!userId) throw new Error('user id not provided')
    if (!reviewId) throw new Error('review id not provided')

    try {
      const review = await Review.findOne({ _id: reviewId })

      if (!review) throw new Error('review not found')

      if (review.user.toString() === userId) {
        const reviewDeleted = await Review.findByIdAndDelete(reviewId)
        return reviewDeleted
      } else throw new Error(UNAUTHORIZED_MESSAGE)
    } catch (error) {
      throw new Error(error.message)
    }
  },

  getGameReviews: async function ({ gameId, limit = 10, page = 1 }) {
    if (!gameId) throw new Error('game id not provided')

    limit = limit < 0 ? 10 : limit > 50 ? 50 : limit
    page = Math.max(page, 1)

    try {
      const values = await Promise.all([
        Review.countDocuments({
          note: 0,
          gameId,
        }),
        Review.countDocuments({
          note: 1,
          gameId,
        }),
        Review.countDocuments({
          note: 2,
          gameId,
        }),
        Review.countDocuments({
          note: 3,
          gameId,
        }),
        Review.countDocuments({
          note: 4,
          gameId,
        }),
        Review.countDocuments({
          note: 5,
          gameId,
        }),
        Review.paginate(
          { gameId },
          {
            page,
            limit,
            populate: ['user', '-password'],
            sort: {
              createdAt: -1,
            },
          }
        ),
      ])
      return {
        count: {
          0: values[0],
          1: values[1],
          2: values[2],
          3: values[3],
          4: values[4],
          5: values[5],
        },
        reviews: values[6],
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },
  updateLike: async function ({ reviewId, userId, like }) {
    const review = await Review.findById({ _id: reviewId })
    console.log(review)

    if (!review) throw new Error('review not found')
    if (like && review.likes.includes(userId))
      throw new Error('review already liked by this user')
    if (!like && !review.likes.includes(userId))
      throw new Error('review cannot be disliked. this user didnt liked it yet')

    if (like) await review.updateOne({ $push: { likes: userId } })
    else await review.updateOne({ $pull: { likes: userId } })
  },
}
