const {
  createUserReview,
  updateUserReview,
  getReview,
  deleteUserReview,
  getGameReviews,
  getUserReviewByGame,
  getUserReviews,
} = require('../services/review.service')

module.exports = {
  create: async function (req, res) {
    const { gameId, text, recommendation, userId } = req.body

    try {
      const existingReview = await getUserReviewByGame({ gameId, userId })
      if (existingReview)
        throw new Error(
          `there's an existing review for this game from user ${userId}`
        )
      const review = await createUserReview({
        gameId,
        userId,
        recommend: recommendation,
        text: text || '',
      })
      return res.status(201).json(review)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },

  update: async function (req, res) {
    const { id } = req.params
    const { text, recommendation, userId } = req.body

    try {
      const review = await updateUserReview({
        reviewId: id,
        userId,
        text,
        recommend: recommendation,
      })
      return res.status(200).json(review)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },

  get: async function (req, res) {
    const { id } = req.params

    try {
      const review = await getReview({ reviewId: id })
      return res.status(200).json(review)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },

  getAll: async function (req, res) {
    const { page, limit } = req.query
    const { id } = req.params

    try {
      const reviews = await getGameReviews({ limit, page, gameId: id })
      return res.status(200).json(reviews)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },

  getByUser: async function (req, res) {
    const { userId } = req.params

    try {
      const reviews = await getUserReviews(userId)
      return res.status(200).json(reviews)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },

  getByUserAndGame: async function (req, res) {
    const { gameId, userId } = req.params

    try {
      const reviews = await getUserReviewByGame({ userId, gameId })
      return res.status(200).json(reviews)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },

  remove: async function (req, res) {
    const { id } = req.params
    const { userId } = req.body

    try {
      const review = await deleteUserReview({ reviewId: id, userId })
      return res.status(200).json(review)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },
}
