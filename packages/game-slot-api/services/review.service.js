const Review = require('../models/Review')

RECOMMENDATION_ENUM = {
  yes: 1,
  meh: 2,
  no: 3,
}

module.exports = {
  createUserReview: async function({ gameId, userId, text, recommend }) {
    if (!userId) throw new Error(`user id not provided`)
    if (!gameId) throw new Error(`game steam id not provided`)

    const recommendationValue = RECOMMENDATION_ENUM[recommend]
    if (!recommendationValue) throw new Error(`recommendation value not provided`)

    try {
      const reviewCreated = await Review.create({
        gameId,
        userId,
        text,
        recommended: recommendationValue,
      })

      return reviewCreated
    } catch (error) {
      throw new Error(error.message)
    }
  },

  updateUserReview: async function({ reviewId, userId, text, recommend }) {
    if (!userId) throw new Error(`user id not provided`)
    if (!reviewId) throw new Error(`review id not provided`)

    try {
      const reviewToUpdate = await Review.findOne({ _id: reviewId })

      if (!reviewToUpdate) throw new Error(`review not found`)

      if (reviewToUpdate.userId.toString() === userId) {
        const body = {}

        if (recommend) {
          const recommendationValue = RECOMMENDATION_ENUM[recommend]
          if (!recommendationValue) throw new Error(`invalid recommendation value`)
          body.recommended = recommendationValue
        }

        if (text) body.text = text

        const reviewUpdated = await Review.findOneAndUpdate({ _id: reviewId }, body, {
          new: true,
        })
        return reviewUpdated
      } else throw new Error(`you don't have the permission for this action`)
    } catch (error) {
      throw new Error(error.message)
    }
  },

  getUserReview: async function({ reviewId, userId }) {
    if (!userId) throw new Error(`user id not provided`)
    if (!reviewId) throw new Error(`review id not provided`)

    try {
      const review = await Review.findOne({ _id: reviewId })

      if (!review) throw new Error(`review not found`)

      if (review.userId.toString() === userId) return review
      else throw new Error(`you don't have the permission for this action`)
    } catch (error) {
      throw new Error(error.message)
    }
  },

  deleteUserReview: async function({ reviewId, userId }) {
    if (!userId) throw new Error(`user id not provided`)
    if (!reviewId) throw new Error(`review id not provided`)

    try {
      const review = await Review.findOne({ _id: reviewId })

      if (!review) throw new Error(`review not found`)

      if (review.userId.toString() === userId) {
        const reviewDeleted = await Review.findByIdAndDelete(reviewId)
        return reviewDeleted
      } else throw new Error(`you don't have the permission for this action`)
    } catch (error) {
      throw new Error(error.message)
    }
  },

  getGameReviews: async function({ gameId, limit = 10, page = 1 }) {
    if (!gameId) throw new Error(`game id not provided`)

    try {
      const positive = await Review.countDocuments({
        recommended: RECOMMENDATION_ENUM.yes,
      })
      const neutral = await Review.countDocuments({
        recommended: RECOMMENDATION_ENUM.meh,
      })
      const negative = await Review.countDocuments({
        recommended: RECOMMENDATION_ENUM.no,
      })
      const reviews = await Review.paginate(
        { gameId },
        {
          page,
          limit,
        }
      )
      return { count: { positive, neutral, negative }, reviews }
    } catch (error) {
      throw new Error(error.message)
    }
  },
}
