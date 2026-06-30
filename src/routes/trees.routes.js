const { Router } = require('express');
const treesController = require('../controllers/trees.controller');
const { requireAuth } = require('../middlewares/auth.middleware');

const router = Router();

router.post('/', requireAuth, treesController.createSharedTree);
router.get('/', requireAuth, treesController.getMyTrees);
router.post('/:treeId/notes', requireAuth, treesController.addNoteToTree);

module.exports = router;
