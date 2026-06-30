const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class AudioService {
  async getTracks(userId) {
    const result = await db.query(
      'SELECT id, user_id, title, dur, url, created_at, shared_tree_id FROM public.audio_tracks WHERE user_id = $1',
      [userId],
    );

    if (result.rows.length === 0) {
      return [
        {
          id: uuidv4(),
          user_id: userId,
          title: 'Recorded Lesson 1',
          dur: 180,
          url: 'https://storage.supabase.co/audio_records/' + userId + '/file.mp3',
          created_at: Date.now(),
          shared_tree_id: null,
        },
      ];
    }
    return result.rows;
  }

  async createTrack(userId, trackData) {
    const profileRes = await db.query('SELECT can_cloud_audio FROM public.profiles WHERE id = $1', [
      userId,
    ]);
    const userProfile = profileRes.rows[0];

    if (userProfile && !userProfile.can_cloud_audio && !trackData.shared_tree_id) {
      throw new Error('Cloud storage permission denied');
    }

    const trackId = uuidv4();
    const queryStr =
      'INSERT INTO public.audio_tracks (id, user_id, title, dur, url, created_at, shared_tree_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const params = [
      trackId,
      userId,
      trackData.title,
      trackData.dur,
      'https://storage.supabase.co/audio_records/' + userId + '/' + trackId + '.mp3',
      Date.now(),
      trackData.shared_tree_id || null,
    ];
    await db.query(queryStr, params);

    return {
      id: trackId,
      user_id: userId,
      title: trackData.title,
      dur: trackData.dur,
      url: params[4],
      created_at: params[5],
      shared_tree_id: trackData.shared_tree_id || null,
    };
  }

  async removeTrack(userId, trackId) {
    const queryStr = 'DELETE FROM public.audio_tracks WHERE id = $1 AND user_id = $2';
    await db.query(queryStr, [trackId, userId]);
    return true;
  }
}

module.exports = new AudioService();
