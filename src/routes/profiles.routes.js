const { Router } = require('express');
const profilesController = require('../controllers/profiles.controller');
const { requireAuth } = require('../middlewares/auth.middleware');

const router = Router();

router.get('/me', requireAuth, profilesController.getMyProfile);
router.get('/search', requireAuth, profilesController.searchUsers);
router.patch('/me', requireAuth, profilesController.updateProfile);

module.exports = router;
