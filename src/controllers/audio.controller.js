const audioService = require('../services/audio.service');

exports.getAudioTracks = async (req, res, next) => {
  try {
    const tracks = await audioService.getTracks(req.user.id);
    res.status(200).json({ data: tracks });
  } catch (error) {
    next(error);
  }
};

exports.addAudioTrack = async (req, res, next) => {
  try {
    const track = await audioService.createTrack(req.user.id, req.body);
    res.status(201).json({ data: track });
  } catch (error) {
    next(error);
  }
};

exports.deleteAudioTrack = async (req, res, next) => {
  try {
    const { trackId } = req.params;
    await audioService.removeTrack(req.user.id, trackId);
    res.status(200).json({ status: 'success', message: 'Track deleted' });
  } catch (error) {
    next(error);
  }
};
