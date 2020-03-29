const {
  createUserReview,
  updateUserReview,
  getUserReview,
  deleteUserReview,
  getGameReviews,
} = require('../services/review.service')

module.exports = {
  create: async function(req, res) {
    const { _id } = req.user
    const { gameId, text, recommendation } = req.body

    try {
      const review = await createUserReview({
        gameId,
        userId: _id,
        recommend: recommendation,
        text: text || '',
      })
      return res.status(201).json(review)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },

  update: async function(req, res) {
    const { _id } = req.user
    const { id } = req.params
    const { text, recommendation } = req.body

    try {
      const review = await updateUserReview({
        reviewId: id,
        userId: _id,
        text,
        recommend: recommendation,
      })
      return res.status(200).json(review)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },

  get: async function(req, res) {
    const { _id } = req.user
    const { id } = req.params

    try {
      const review = await getUserReview({ reviewId: id, userId: _id })
      return res.status(200).json(review)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },

  getAll: async function(req, res) {
    const { page, limit } = req.query
    const { id } = req.params

    try {
      const reviews = await getGameReviews({ limit, page, gameId: id })
      return res.status(200).json(reviews)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },

  remove: async function(req, res) {
    const { _id } = req.user
    const { id } = req.params

    try {
      const review = await deleteUserReview({ reviewId: id, userId: _id })
      return res.status(200).json(review)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },
}
