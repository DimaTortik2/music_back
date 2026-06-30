const profilesService = require('../services/profiles.service');

exports.getMyProfile = async (req, res, next) => {
  try {
    const profile = await profilesService.getProfileById(req.user.id);
    res.status(200).json({ data: profile });
  } catch (error) {
    next(error);
  }
};

exports.searchUsers = async (req, res, next) => {
  try {
    const { q } = req.query;
    const users = await profilesService.searchUsersSecure(q);
    res.status(200).json({ data: users });
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const updated = await profilesService.updateProfile(req.user.id, req.body);
    res.status(200).json({ data: updated });
  } catch (error) {
    next(error);
  }
};
