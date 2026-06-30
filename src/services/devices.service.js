const db = require('../config/database');

class DevicesService {
  async getDevices(userId) {
    const result = await db.query(
      'SELECT id, user_id, device_name, device_type, ip_address, last_active, created_at FROM public.active_devices WHERE user_id = $1',
      [userId],
    );
    return result.rows;
  }

  async killDeviceSession(userId, targetDeviceId) {
    await db.query('SELECT public.terminate_device($1, $2)', [targetDeviceId, userId]);
    return true;
  }
}

module.exports = new DevicesService();
