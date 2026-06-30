const friendsService = require('../services/friends.service');

exports.getFriends = async (req, res, next) => {
  try {
    const list = await friendsService.getFriendsList(req.user.id);
    res.status(200).json({ data: list });
  } catch (error) {
    next(error);
  }
};

exports.sendFriendRequest = async (req, res, next) => {
  try {
    const { recipient_id } = req.body;
    const notification = await friendsService.sendRequest(req.user.id, recipient_id);
    res.status(201).json({ status: 'success', data: notification });
  } catch (error) {
    next(error);
  }
};

exports.acceptFriendRequest = async (req, res, next) => {
  try {
    const { notification_id, sender_id } = req.body;
    await friendsService.acceptRequest(notification_id, sender_id, req.user.id);
    res.status(200).json({ status: 'success', message: 'Friend request accepted' });
  } catch (error) {
    next(error);
  }
};

exports.removeFriend = async (req, res, next) => {
  try {
    const { friendId } = req.params;
    await friendsService.deleteFriendship(req.user.id, friendId);
    res.status(200).json({ status: 'success', message: 'Friend removed' });
  } catch (error) {
    next(error);
  }
};
