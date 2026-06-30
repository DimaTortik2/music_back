const devicesService = require('../services/devices.service');

exports.getActiveDevices = async (req, res, next) => {
  try {
    const devices = await devicesService.getDevices(req.user.id);
    res.status(200).json({ data: devices });
  } catch (error) {
    next(error);
  }
};

exports.terminateDevice = async (req, res, next) => {
  try {
    const { target_device_id } = req.body;
    await devicesService.killDeviceSession(req.user.id, target_device_id);
    res.status(200).json({ status: 'terminated' });
  } catch (error) {
    next(error);
  }
};
