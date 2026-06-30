const { Router } = require('express');
const authRoutes = require('./auth.routes');
const profilesRoutes = require('./profiles.routes');
const friendsRoutes = require('./friends.routes');
const treesRoutes = require('./trees.routes');
const audioRoutes = require('./audio.routes');
const devicesRoutes = require('./devices.routes');

const router = Router();

router.use('/auth', authRoutes);
router.use('/profiles', profilesRoutes);
router.use('/friends', friendsRoutes);
router.use('/shared-trees', treesRoutes);
router.use('/audio', audioRoutes);
router.use('/devices', devicesRoutes);

module.exports = router;
