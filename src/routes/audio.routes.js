const { Router } = require('express');
const router = Router();
const { requireAuth } = require('../middlewares/auth.middleware');

router.get('/', requireAuth, (req, res) => res.status(200).json({ data: [] }));
router.post('/', requireAuth, (req, res) => res.status(201).json({ status: 'uploaded' }));

module.exports = router;
