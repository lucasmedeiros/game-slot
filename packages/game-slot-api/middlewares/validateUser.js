module.exports = {
  checkUser: function(req, res, next) {
    const { id } = req.params

    if (!id) return res.status(400).json({ error: `'id' not provided` })

    if (id.trim() !== req.user._id)
      return res
        .status(401)
        .json({ error: `you don't have the permission for this action` })
    return next()
  },
}
