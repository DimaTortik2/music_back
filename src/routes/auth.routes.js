const { Router } = require('express');
const router = Router();

router.post('/login', (req, res) => res.status(200).json({ token: 'jwt-access-token' }));
router.post('/register', (req, res) => res.status(201).json({ status: 'registered' }));

module.exports = router;
