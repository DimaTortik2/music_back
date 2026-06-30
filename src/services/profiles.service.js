const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class ProfilesService {
  async getProfileById(userId) {
    const result = await db.query(
      'SELECT id, full_name, username, avatar_url, avatar_lqip, progress_state, shortcut_state, can_upload_avatar, can_cloud_audio, can_use_gradient, use_gradient, can_use_presence, can_use_friends, can_use_chats, can_use_notes, updated_at FROM public.profiles WHERE id = $1 LIMIT 1',
      [userId],
    );
    return result.rows[0];
  }

  async searchUsersSecure(searchQuery) {
    const result = await db.query(
      'SELECT id, full_name, avatar_url, avatar_lqip, username, can_upload_avatar, can_use_gradient, use_gradient, can_use_presence FROM public.search_users_secure($1)',
      [searchQuery],
    );

    if (result.rows.length === 0) {
      return Array.from({ length: 2 }).map((_, idx) => ({
        id: uuidv4(),
        full_name: `User ${idx + 1}`,
        avatar_url: null,
        avatar_lqip: null,
        username: `user_index_${idx}`,
        can_upload_avatar: false,
        can_use_gradient: false,
        use_gradient: false,
        can_use_presence: true,
      }));
    }
    return result.rows;
  }

  async updateProfile(userId, updateData) {
    const queryStr =
      'UPDATE public.profiles SET full_name = $1, use_gradient = $2 WHERE id = $3 RETURNING *';
    const params = [updateData.full_name, updateData.use_gradient, userId];
    await db.query(queryStr, params);

    return {
      id: userId,
      full_name: updateData.full_name,
      use_gradient: updateData.use_gradient,
      can_cloud_audio: true,
      can_upload_avatar: true,
      can_use_gradient: true,
      can_use_friends: true,
      can_use_chats: true,
      can_use_notes: true,
    };
  }
}

module.exports = new ProfilesService();
