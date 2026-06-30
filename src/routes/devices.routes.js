const { Router } = require('express');
const devicesController = require('../controllers/devices.controller');
const { requireAuth } = require('../middlewares/auth.middleware');

const router = Router();

router.get('/', requireAuth, devicesController.getActiveDevices);
router.post('/terminate', requireAuth, devicesController.terminateDevice);

module.exports = router;
