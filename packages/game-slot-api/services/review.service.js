const Review = require('../models/Review')

const RECOMMENDATION_ENUM = {
  yes: 1,
  meh: 2,
  no: 3,
}

module.exports = {
  createUserReview: async function ({ gameId, userId, text, recommend }) {
    if (!userId) throw new Error('user id not provided')
    if (!gameId) throw new Error('game steam id not provided')

    const recommendationValue = RECOMMENDATION_ENUM[recommend]
    if (!recommendationValue) throw new Error('recommendation value not provided')

    try {
      const reviewCreated = await Review.create({
        gameId,
        user: userId,
        text,
        recommended: recommendationValue,
      })

      return reviewCreated
    } catch (error) {
      throw new Error(error.message)
    }
  },

  updateUserReview: async function ({ reviewId, userId, text, recommend }) {
    if (!userId) throw new Error('user id not provided')
    if (!reviewId) throw new Error('review id not provided')

    try {
      const reviewToUpdate = await Review.findOne({ _id: reviewId })

      if (!reviewToUpdate) throw new Error('review not found')

      if (reviewToUpdate.user.toString() === userId) {
        const body = {}

        if (recommend) {
          const recommendationValue = RECOMMENDATION_ENUM[recommend]
          if (!recommendationValue) throw new Error('invalid recommendation value')
          body.recommended = recommendationValue
        }

        if (text) body.text = text

        const reviewUpdated = await Review.findOneAndUpdate({ _id: reviewId }, body, {
          new: true,
        })
        return reviewUpdated
      } else throw new Error("you don't have the permission for this action")
    } catch (error) {
      throw new Error(error.message)
    }
  },

  getReview: async function ({ reviewId, userId }) {
    if (!userId) throw new Error('user id not provided')
    if (!reviewId) throw new Error('review id not provided')

    try {
      const review = await Review.findOne({ _id: reviewId })

      if (!review) throw new Error('review not found')

      if (review.user.toString() === userId) return review
      else throw new Error("you don't have the permission for this action")
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
      } else throw new Error("you don't have the permission for this action")
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
          recommended: RECOMMENDATION_ENUM.yes,
          gameId,
        }),
        Review.countDocuments({
          recommended: RECOMMENDATION_ENUM.meh,
          gameId,
        }),
        Review.countDocuments({
          recommended: RECOMMENDATION_ENUM.no,
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
          positive: values[0],
          neutral: values[1],
          negative: values[2],
        },
        reviews: values[3],
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },
}
