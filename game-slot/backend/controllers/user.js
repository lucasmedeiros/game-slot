const User = require('../models/User')

module.exports = {
  list: async function (req, res) {
    const { nickname, email, followers, followings } = req.query
    const users = await User.find({
      ...(!!nickname && { nickname: { $regex: nickname, $options: 'i' } }),
      ...(!!email && { email }),
      ...(!!followers && { followers: followers }),
    })
    return res.status(200).json(users)
  },
  getById: async function (req, res) {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ error: `'id' not provided` })
    }

    const user = await User.findById({ _id: id })

    if (!user) {
      return res.status(404).json({ error: `user not found` })
    }

    return res.status(200).json({ user })
  },
  follow: async function (req, res) {
    const { id: userToFollowId } = req.params
    const { userId: followerId } = req.body

    if (!followerId) {
      return res
        .status(400)
        .json({ error: 'you must provide userId in request body' })
    }

    if (followerId === userToFollowId) {
      return res.status(400).json({
        error: `user '${followerId}' can't follow itself`,
      })
    }

    const userToFollow = await User.findById(userToFollowId)
    const follower = await User.findById(followerId)

    if (!userToFollow) {
      return res
        .status(404)
        .json({ error: `user '${userToFollowId}' not found` })
    }

    if (!follower) {
      return res.status(404).json({ error: `user '${followerId}' not found` })
    }

    if (
      userToFollow.followers.includes(followerId) ||
      follower.followings.includes(userToFollowId)
    ) {
      return res.status(404).json({
        error: `user '${follower.email}' already follows user '${userToFollow.email}'`,
      })
    }

    await userToFollow.updateOne({
      $push: { followers: followerId },
    })
    await follower.updateOne({
      $push: { followings: userToFollowId },
    })

    return res.status(200).json({
      message: `user '${userToFollow.email}' has been followed by '${follower.email}'`,
    })
  },
  unfollow: async function (req, res) {
    const { id: userToUnfollowId } = req.params
    const { userId: unfollowerId } = req.body

    if (!unfollowerId) {
      return res
        .status(400)
        .json({ error: 'you must provide userId in request body' })
    }

    if (unfollowerId === userToUnfollowId) {
      return res.status(400).json({
        error: `user '${unfollowerId}' can't unfollow itself`,
      })
    }

    const userToUnfollow = await User.findById(userToUnfollowId)
    const unfollower = await User.findById(unfollowerId)

    if (!userToUnfollow) {
      return res
        .status(404)
        .json({ error: `user '${userToUnfollowId}' not found` })
    }

    if (!unfollower) {
      return res.status(404).json({ error: `user '${unfollowerId}' not found` })
    }

    if (
      !userToUnfollow.followers.includes(unfollowerId) &&
      !unfollower.followings.includes(userToUnfollowId)
    ) {
      return res.status(404).json({
        error: `user '${unfollower.email}' isn't following user '${userToUnfollow.email}'`,
      })
    }

    await userToUnfollow.updateOne({
      $pull: { followers: unfollowerId },
    })
    await unfollower.updateOne({
      $pull: { followings: userToUnfollowId },
    })

    return res.status(200).json({
      message: `user '${userToUnfollow.email}' has been unfollowed by '${unfollower.email}'`,
    })
  },
}
