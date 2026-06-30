const treesService = require('../services/trees.service');

exports.createSharedTree = async (req, res, next) => {
  try {
    const { friend_id } = req.body;
    const newTree = await treesService.createTree(req.user.id, friend_id);
    res.status(201).json({ data: newTree });
  } catch (error) {
    next(error);
  }
};

exports.getMyTrees = async (req, res, next) => {
  try {
    const trees = await treesService.getUserTrees(req.user.id);
    res.status(200).json({ data: trees });
  } catch (error) {
    next(error);
  }
};

exports.addNoteToTree = async (req, res, next) => {
  try {
    const note = await treesService.addSharedNote(req.user.id, req.params.treeId, req.body);
    res.status(201).json({ data: note });
  } catch (error) {
    next(error);
  }
};
