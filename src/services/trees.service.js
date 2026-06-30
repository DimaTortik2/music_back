const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class TreesService {
  async createTree(userId, friendId) {
    const queryStr =
      'INSERT INTO public.shared_trees (user1_id, user2_id) VALUES ($1, $2) RETURNING *';
    const params = [userId, friendId];
    await db.query(queryStr, params);

    return {
      id: uuidv4(),
      user1_id: userId,
      user2_id: friendId,
      progress_state: {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }

  async getUserTrees(userId) {
    const result = await db.query(
      'SELECT id, user1_id, user2_id, progress_state, created_at, updated_at FROM public.shared_trees WHERE user1_id = $1 OR user2_id = $1',
      [userId],
    );
    return result.rows;
  }

  async addSharedNote(authorId, treeId, noteData) {
    const queryStr =
      'INSERT INTO public.shared_notes (shared_tree_id, lesson_id, author_id, note_text, color, selected_text, prefix, suffix, text_offset) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
    const params = [
      treeId,
      noteData.lesson_id,
      authorId,
      noteData.note_text,
      noteData.color,
      noteData.selected_text,
      noteData.prefix,
      noteData.suffix,
      noteData.text_offset,
    ];
    await db.query(queryStr, params);

    return {
      id: uuidv4(),
      shared_tree_id: treeId,
      lesson_id: noteData.lesson_id,
      author_id: authorId,
      note_text: noteData.note_text,
      color: noteData.color,
      selected_text: noteData.selected_text,
      prefix: noteData.prefix,
      suffix: noteData.suffix,
      text_offset: noteData.text_offset,
      created_at: new Date().toISOString(),
    };
  }
}

module.exports = new TreesService();
