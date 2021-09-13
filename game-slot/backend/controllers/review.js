const reviewService = require('../services/review.service')
const {
  createUserReview,
  updateUserReview,
  getReview,
  deleteUserReview,
  getGameReviews,
  getUserReviewByGame,
  getUserReviews,
} = require('../services/review.service')

async function updateLike(req, res, like) {
  const { id: reviewId } = req.params
  const { userId } = req.body

  if (!userId) {
    return res
      .status(400)
      .json({ error: 'you must provide userId in request body' })
  }

  try {
    await reviewService.updateLike({ reviewId, userId, like })
    return res.status(200).send()
  } catch (e) {
    return res.status(400).json({ error: e.message })
  }
}

module.exports = {
  create: async function (req, res) {
    const { gameId, text, note, userId } = req.body

    try {
      const existingReview = await getUserReviewByGame({ gameId, userId })
      if (existingReview)
        throw new Error(
          `there's an existing review for this game from user ${userId}`
        )
      const review = await createUserReview({
        gameId,
        userId,
        note,
        text: text || '',
      })
      return res.status(201).json(review)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },

  update: async function (req, res) {
    const { id } = req.params
    const { text, note, userId } = req.body

    try {
      const review = await updateUserReview({
        reviewId: id,
        userId,
        text,
        note,
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
  like: async function (req, res) {
    await updateLike(req, res, true)
  },
  dislike: async function (req, res) {
    await updateLike(req, res, false)
  },
}
